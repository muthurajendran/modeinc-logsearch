export class Candidate {
    _id: number;
    email: string;
    password: string;
    phone: string;
    verifyCode: string;
    verified: boolean;
    references: Array<any>;
    candidate_references: Array<any>;
    questions: Array<any>;
};
