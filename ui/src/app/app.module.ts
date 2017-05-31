import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {ROUTES} from './app.routes';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { LoggedInGuard } from './views/session/logged-in.guard';
import { SessionService } from './views/session/session.service';
import { AlertService } from './components/alert/alert.service';

// App views
import {LoginModule} from './views/login/login.module';
import {RegisterModule} from './views/register/register.module';

// App modules/components
import {LayoutsModule} from './components/common/layouts/layouts.module';
import { LoadingModule } from './components/common/loading/loading.module';
import { ReferencesModule } from './views/references/references.module';
import { RecruiterModule } from './views/recruiter/recruiter.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular modules
    BrowserModule,
    HttpModule,
    FormsModule,
    // Views

    LoginModule,
    RegisterModule,
    ReferencesModule,
    RecruiterModule,

    // Modules
    LayoutsModule,
    LoadingModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, SessionService, AlertService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
