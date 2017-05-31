import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { AlertModule } from '../../components/alert/alert.module';
import { LoadingModule } from '../../components/common/loading/loading.module';

import { RecruiterRoutingModule  } from './recruiter.routes';

import { RecruiterComponent } from './recruiter.component';

@NgModule({
    imports: [
        CommonModule,
        RecruiterRoutingModule,
        BrowserModule,
        RouterModule,
        FormsModule,
        AlertModule,
        LoadingModule
    ],
    declarations: [
        RecruiterComponent
    ]
})

export class RecruiterModule {}
