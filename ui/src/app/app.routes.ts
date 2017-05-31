import {Routes} from "@angular/router";

import {loginComponent} from "./views/login/login.component";
import {RegisterComponent} from "./views/register/register.component";
import {blankComponent} from "./components/common/layouts/blank.component";


export const ROUTES:Routes = [
  // Main redirect
  {path: '', redirectTo: 'references', pathMatch: 'full'},
  {
    path: '', component: blankComponent,
    children: [
      { path: 'login', component: loginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },


  // Handle all other routes
  {path: '**', redirectTo: 'login', pathMatch: 'full' }
];
