import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { MyRouter } from '../../router/router';

/*
  Generated class for the Message page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-message',
    templateUrl: 'message.html'
})

export class MessagePage {
    messagelsititem;
    userinfo;
    router: MyRouter = new MyRouter();


    constructor(public navCtrl: NavController, public navParams: NavParams, private dataService: DataService) {
        this.refreshData();

    }

    goToMessageDetailPage(id: number, name: string, msg: string, type: string, ) {

        this.router.goMessageDetail(this.navCtrl, this.navParams, id, name, msg, type);

    }
    
    ionViewWillEnter() {
      this.refreshData();
    }
 

    refreshData() {
        this.dataService.getUserInfo().then((res => {
            this.userinfo = res;
        }))
        this.dataService.getMessageHistory().then((res => {
            this.messagelsititem = res;
        }))
         console.log(this.messagelsititem );
    };



    getItems(ev: any) {
        var val = ev.target.value;

        if (val && val.trim() != '') {
            this.messagelsititem = this.messagelsititem.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                    item.lastmsg.toLowerCase().indexOf(val.toLowerCase()) > -1)
            })

        }

    }

    // ionViewWillEnter() {
    //   console.log('ionViewDidLoad MessagePage');
    // }




};

