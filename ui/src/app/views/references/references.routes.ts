import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../session/logged-in.guard';

import {basicComponent} from '../../components/common/layouts/basic.component';
import { ReferencesIndexComponent } from './references-index/references-index.component';

const referencesRoutes: Routes = [
    { path: 'references', component: basicComponent,
        children: [
            {path: '', component: ReferencesIndexComponent},
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(referencesRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class ReferencesRoutingModule {}
