import { Component, OnInit } from '@angular/core';
declare var jQuery:any;

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    jQuery(document).ready(function() {
      jQuery(".overlay").show();
    });

  }

}
