import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { AlertModule } from '../../components/alert/alert.module';
import { LoadingModule } from '../../components/common/loading/loading.module';

import { ReferencesRoutingModule } from './references.routes';

import { ReferencesComponent } from './refernces.component';
import { ReferencesIndexComponent } from './references-index/references-index.component';


@NgModule({
    imports: [
        CommonModule,
        ReferencesRoutingModule,
        BrowserModule,
        RouterModule,
        FormsModule,
        AlertModule,
        LoadingModule
    ],
    declarations: [
        ReferencesComponent, ReferencesIndexComponent
    ]
})

export class ReferencesModule {}
