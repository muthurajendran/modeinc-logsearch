import {RegisterComponent} from "./register.component";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { FormsModule }    from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertModule } from "../../components/alert/alert.module";
import { LoadingModule } from '../../components/common/loading/loading.module';


@NgModule({
    declarations: [RegisterComponent],
    imports     : [BrowserModule, AlertModule, FormsModule, RouterModule],
})

export class RegisterModule {}