import { Component, OnInit } from '@angular/core';
import { Reference } from '../../../models/reference';
import { ReferencesService } from '../../../services/references/references.service';

import { AlertService } from '../../../components/alert/alert.service';


import * as _ from 'lodash';
declare var jQuery: any;
declare var FooTable: any;

class Search {
    search_date: String;
    search_time: String;
    limit: Number;
    page: number;
}

@Component({
    selector: 'app-references-index',
    templateUrl: './references-index.template.html',
    styleUrls: ['./references-index.component.css'],
    providers: [ ReferencesService ]
})

export class ReferencesIndexComponent implements OnInit {

    loading = false;
    errorMessage = '';
    results = [];
    model = new Search();

    isVerifyCode = false;
    referenceAdd = new Reference();

    constructor( private referenceService: ReferencesService,
                 private alertService: AlertService) {
    }


    ngOnInit() {
        this.model.page = 0;
        this.model.search_time = '00:05:34';
        this.model.search_date = '2017-01-05';
    }


    onSelect() {
        this.referenceAdd = new Reference();
    }

    searchSubmit() {
        this.results = [];
        this.loading = true;
        this.referenceService.search(this.model)
                .subscribe(
                    data => {
                        this.loading = false;
                        Array.prototype.push.apply(this.results, data['data']);
                        console.log(this.results);
                    },
                    error => {
                        this.errorMessage = <any> error;
                        this.alertService.error(error);
                        this.loading = false;
                    }
                );
    }

    more() {
        let num = this.model.page;
        this.model.page = num + 1;
        this.referenceService.search(this.model)
            .subscribe(
                data => {
                    this.loading = false;
                    Array.prototype.push.apply(this.results, data['data']);
                    console.log(this.results);
                },
                error => {
                    this.errorMessage = <any> error;
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
    }

}
