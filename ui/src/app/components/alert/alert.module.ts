import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { FormsModule }    from '@angular/forms';
import {AlertComponent} from "./alert.component";

@NgModule({
    declarations: [AlertComponent],
    imports     : [BrowserModule, FormsModule],
    exports     : [AlertComponent],
})

export class AlertModule {}