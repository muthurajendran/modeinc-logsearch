import { Component, OnInit } from '@angular/core';
 
import { AlertService } from './alert.service';
 
@Component({
    selector: 'alert',
    templateUrl: 'alert.template.html'
})
 
export class AlertComponent {
    message: any;
 
    constructor(private alertService: AlertService) {
      this.alertService.getMessage().subscribe(message => { 
        this.message = message; 
      });
    }

    onClose() {
        this.message = '';
    }
}