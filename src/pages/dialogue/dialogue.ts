import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';

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
  onPlus: boolean = false;

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

  isPlus() {
    this.onPlus = false;
    }


    getPhoto(type: number) {
    let options = {
      //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
      quality: 100,                                            //相片质量0-100
      allowEdit: false,                                        //在选择之前允许修改截图
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: type,                                         //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
      encodingType: Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
      targetWidth: 800,                                        //照片宽度
      targetHeight: 800,                                       //照片高度
      mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
      cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
      saveToPhotoAlbum: true                                   //保存进手机相册
    };
    Camera.getPicture(options).then((imageData) => {
      // imageData is a base64 encoded string
      console.log('success');
        console.log(imageData);
    }, (err) => {
        console.log('err');
      console.log(err);
    });
  }

 // ionViewWillEnter(){
  ngAfterViewChecked() {
    var div = document.getElementsByClassName('scroll-content');
    console.log(div);
    div[2].scrollTop = div[2].scrollHeight;
   
    // let input = document.getElementById("input");
    // let pag_content = document.getElementById("pag-content");
    // if (this.onPlus) {
    //   input.style.height = "130px";
    //   pag_content.style.height = "82%";
    // } else {
    //   input.style.height = "40px";
    //   pag_content.style.height = "96%";
    // }
  }

  // ionViewWillEnter(){
  //   var div = document.getElementsByClassName('scroll-content');
  //   //  div[1].scrollTop = div[1].scrollHeight;
  //    setTimeout(function () {
  //       div[1].scrollTop = div[1].scrollHeight;
  //   }, 10);
  // }

  loadMessage() {
    this.dataService.getUserInfo().then((res => {
      this.userinfo = res;
    }))
    this.dataService.getMessageHistoryByID(this.nameid).then((res => {
      this.list = res;
    }))
  };

  sendMessage(content:string) {
    console.log(content+'a');
    let history = this.dataService.history;
    history.push({
      "id": 13,
      "to": this.nameid,
      "from": this.userinfo.id,
      "content": this.input_text,
      "msgtype": "text",
      "time": +new Date(),
      "type": "dialogue"
    });

    this.list.push({
      "id": 103,
      "to": this.nameid,
      "from": this.userinfo.id,
      "name": "马化腾",
      "nameid": this.nameid,
      "src": this.userinfo.src,
      "content": this.input_text,
      "time": +new Date(),
      "type": "dialogue"
    })

 

    this.input_text = '';

    // var div = document.getElementsByClassName('scroll-content');
    // //  div[1].scrollTop = div[1].scrollHeight;
    //   div[1].scrollTop = div[1].scrollHeight;
  }
}
