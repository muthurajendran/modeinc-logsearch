import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { FormsModule }    from '@angular/forms';
import {loginComponent} from "./login.component";
import { RouterModule } from '@angular/router';
import { AlertModule } from "../../components/alert/alert.module";
import { LoadingModule } from '../../components/common/loading/loading.module';

@NgModule({
    declarations: [loginComponent],
    imports     : [BrowserModule, FormsModule, RouterModule, AlertModule, LoadingModule],
})

export class LoginModule {}