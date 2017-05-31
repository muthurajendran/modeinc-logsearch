from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from json import dumps
import os
import json
import operator
from pymongo import MongoClient
import pymongo
from flask_pymongo import PyMongo
from collections import defaultdict
import datetime
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)
api = Api(app)

# Connect to mongodb database
# TODO - Future move credentials to env for security
app.config['MONGO_DBNAME'] = 'modeinc'
app.config['MONGO_URI'] = '<uri goes here>'
mongo = PyMongo(app)


def get_db():
    ''' Mongodb connector client '''
    db = MongoClient('<uri goes here>')
    return db.modeinc


def buildIndexForQuerying(db, ignore=False):
    ''' build data and jaccard similarity '''
    try:
        print "Building timeseries data..."
        if ignore:
            return
        db.logs.drop()
        input_path = './data'
        for filename in os.listdir(input_path):
            if not filename.startswith("."):
                with open(input_path + "/" + filename, 'r') as fc:
                    path = input_path + "/" + filename
                    first = json.loads(fc.readline())
                    last = json.loads(fc.readlines()[-1])
                    first_time = datetime.datetime.strptime(first['ts'], "%Y-%m-%dT%H:%M:%SZ")
                    last_time = datetime.datetime.strptime(last['ts'], "%Y-%m-%dT%H:%M:%SZ")
                    db.logs.insert({'start': first_time, 'end': last_time, 'filepath': path})
        print "Done building the data"
    except Exception as e:
        print "Error building recommendations", e


class Search(Resource):
    ''' API class for recommendation '''

    def checkLastLine(self, start, end_line):
        pass

    def get(self):
        db = get_db()
        parser = reqparse.RequestParser()
        parser.add_argument('page', type=int, default=0)
        parser.add_argument('limit', type=int, default=10)
        parser.add_argument('start', type=str)

        page = parser.parse_args()['page']
        limit = parser.parse_args()['limit']
        start = parser.parse_args()['start']

        if not start:
            return {'success': False, 'message':'Start date needed'}

        # Date given - now search for first file
        search_start = datetime.datetime.strptime(start, "%Y-%m-%dT%H:%M:%SZ")
        start_obj = db.logs.find_one({
            "start": {"$lte": search_start},
            "end": {"$gte": search_start}
        })
        if not start_obj:
            return {'success': False, 'message':'No data available'}

        # Find all the files
        # new start to get series of files
        new_start = start_obj['start']
        results = db.logs.find({
            "start": {"$gte": new_start}
        })

        # Iterate through all data for pages
        page_limit = page * limit
        data = []
        for doc in results.limit(limit).sort('start', pymongo.ASCENDING):
            with open(doc['filepath'], 'r') as f:
                lines = f.readlines()
                for line in lines:
                    obj_line = json.loads(line)
                    obj_line_time = datetime.datetime.strptime(obj_line['ts'], "%Y-%m-%dT%H:%M:%SZ")

                    if search_start <= obj_line_time:
                        if page_limit > 0:
                            page_limit -= 1
                        else:
                            data.append(obj_line)

                    if len(data) == limit:
                        return {'success': True, 'data': data, 'count': len(data)}

        return {'success': True, 'data': data, 'count': len(data)}

api.add_resource(Search, '/search')

if __name__ == '__main__':
    buildIndexForQuerying(get_db(), True)
    # print "*" * 50
    print "Query Example: http://localhost:5000/search"
    app.run()
