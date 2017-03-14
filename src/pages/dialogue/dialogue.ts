import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-dialogue',
  templateUrl: 'dialogue.html'
})

export class DialoguePage {
  list;
  nameid;
  name;
  input_text;
  userinfo;

  constructor(private dataService: DataService, public params: NavParams) {
    this.nameid = params.data.nameid;
    this.name = params.data.name;
    this.loadMessage();
  }

  isEmpty() {
    if (this.input_text && this.input_text.trim() != '') {
      return false;
    } else {
      return true;
    }
  };

  loadMessage() {
    this.dataService.getUserInfo().then((res => {
      this.userinfo = res;
    }))
    this.dataService.getMessageHistoryByID(this.nameid).then((res => {
      this.list = res;
    }))
  };

  sendMessage() {
    let history = this.dataService.history;
    history.push({
        "id": 13,
        "to": this.nameid,
        "from":  this.userinfo.id,
        "content": this.input_text,
        "time": +new Date(),
        "type": "dialogue"
    });

    this.list.push({
        "id": 13,
        "to": this.nameid,
        "from": this.userinfo.id,
        "name": "马化腾",
        "nameid": this.nameid,
        "src" : this.userinfo.src,
        "content": this.input_text,
        "time": +new Date(),
        "type": "dialogue"})

      this.input_text = '';
  }
}