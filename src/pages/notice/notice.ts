import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html'
})

export class NoticePage {
  name;
  msg;

  constructor(public params: NavParams) {
    this.name = params.data.name;
    this.msg = params.data.msg;
  }

}