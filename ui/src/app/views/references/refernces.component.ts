import { Component, OnInit} from '@angular/core';
import { ReferencesService } from '../../services/references/references.service';


@Component({
    selector: 'app-references',
    template: '',
    providers: [ReferencesService]
})

export class ReferencesComponent implements OnInit {
    constructor() {}

    ngOnInit() {
    }
}
