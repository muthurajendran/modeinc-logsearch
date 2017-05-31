import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../session/logged-in.guard';

import {basicComponent} from '../../components/common/layouts/basic.component';


const recruiterRoutes: Routes = [
    { path: 'recruiter', component: basicComponent, canActivate: [LoggedInGuard],
        children: [
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(recruiterRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class RecruiterRoutingModule {}
