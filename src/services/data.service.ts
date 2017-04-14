import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApplicationItem } from '../interfaces/applicationitem';
import m_contacts from '../mocks/contact';
// import m_reply from '../mocks/reply';
import global from './global';


@Injectable()
export class DataService {
    constructor(private http: Http) { }

    url: string = 'http://10.86.21.168:1234/emobile';
    messageurl: string = 'http://10.86.21.168:1234/emobile/message';

    getContact() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(m_contacts);
            });
        });
    };

    getUserInfo() {
        return new Promise((resolve, reject) => {
            let cache = global.getUserInfo();
            if (cache) {
                resolve(cache);
            } else {
                let userinfo = this.userinfo;
                global.setUserInfo(userinfo);
                resolve(userinfo);
            };
            // else {
            //     wepy.login().then((res) => {
            //         wepy.getUserInfo().then((res) => {
            //             console.log('getuserinfo success');
            //             console.log(res)
            //             global.setUserInfo(res.userInfo);
            //             resolve(res.userInfo);
            //         }).catch(reject);
            //     }).catch(reject);
            // }
        });
    }

    getApplicationList(empno: string): Promise<ApplicationItem[]> {
        // 正式环境应该像这样写
        // return this.http.get(this.url).toPromise().then((res => {
        //     return <ApplicationItem[]>res.json().data;
        // }));

        // 测试阶段暂时hard code
        return Promise.resolve(this.items);
    };

    getMessageList() {
        // return this.http.get(this.messageurl).toPromise().then((res => {
        //     return res.json().data;
        // }));

    };

    getMessageHistoryByID(nameid: string) {
        let history = this.history;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let sorted = history.sort((a, b) => a.time - b.time);
                if (!nameid)
                    resolve(this.leftJoin(sorted, m_contacts))
                else {
                    resolve(this.leftJoin(sorted.filter((v) => (v.from === nameid && v.to === this.userinfo.id) || v.to === nameid && v.from === this.userinfo.id), m_contacts));
                }
            })
        })
    }

    getContactHistory() {
        let history = this.history;
        return new Promise((resolve, reject) => {
            let distince = [];
            let distincetemp = [];
            let rst = [];
            let sorted = history.sort((a, b) => b.time - a.time);
            sorted.forEach((v) => {
                if (v.from === this.userinfo.id && distincetemp.indexOf(v.to) === -1) {
                    distince.push({nameid:v.to});
                    distincetemp.push(v.to);
                }
            });
            console.log(distince,3);

            setTimeout(() => {
                resolve(this.leftJoin(distince, m_contacts)
                );
            });
        })
    }

    getMessageHistory() {
        let history = this.history;
        return new Promise((resolve, reject) => {
            let distince = [];
            let dialoguedistince = [];
            let rst = [];
            let sorted = history.sort((a, b) => b.time - a.time);
            sorted.forEach((v) => {
                if (v.type === 'dialogue') {
                    if (v.from === this.userinfo.id && dialoguedistince.indexOf(v.to) === -1) {
                        dialoguedistince.push(v.to);
                        distince.push({
                            id: v.id,
                            nameid: v.to
                        });
                    }
                    if (v.to === this.userinfo.id && dialoguedistince.indexOf(v.from) === -1) {
                        dialoguedistince.push(v.from);
                        distince.push({
                            id: v.id,
                            nameid: v.from
                        });
                    }
                }
                if (v.type === 'notice' && v.to === this.userinfo.id) {
                    distince.push({
                        id: v.id,
                        nameid: v.from
                    });
                }
            });

            distince.forEach((v) => {
                let pmsg = sorted.filter((msg) => msg.id === v.id);
                let lastmsg = pmsg.length ? pmsg[0].content : '';
                let type = pmsg[0].type;
                let msgtype= pmsg[0].msgtype;
                let timedesc = this.getDateDiff(pmsg[0].time);
                rst.push({
                    nameid: v.nameid,
                    lastmsg: lastmsg,
                    type: type,
                    msgtype:msgtype,
                    timedesc: timedesc
                });
            });

            setTimeout(() => {
                resolve(this.leftJoin(rst, m_contacts)
                );
            });
        });
    }

    leftJoin(original, contacts) {
        let contactObj = global.getContact('');
        let rst = [];

        original.forEach((v) => {
            if (!v.nameid) {
                v.nameid = v.from;
            }
            if (v.nameid) {
                // if (v.nameid !== this.userinfo.id) {
                v.name = contactObj[v.nameid].name;
                v.src = contactObj[v.nameid].icon;
                v.dept = contactObj[v.nameid].dept;
                v.company = contactObj[v.nameid].company;
                v.position = contactObj[v.nameid].position;
                // }
                rst.push(v);
            }
        });
        return rst;
    }

    getDateDiff(dateTimeStamp: number) {
        let Y, M, D, W, H, I, S;

        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();
        // var diffValue = now - dateTimeStamp;
        // if (diffValue < 0) { return; }
        // var dayC = diffValue / day;

        var d = new Date(Math.floor(dateTimeStamp / 1000) * 1000);
        var Week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        Y = d.getFullYear();
        M = this.fillZero(d.getMonth() + 1);
        D = this.fillZero(d.getDate());
        W = Week[d.getDay()];
        H = this.fillZero(d.getHours());
        I = this.fillZero(d.getMinutes());
        S = this.fillZero(d.getSeconds());

        if (new Date(dateTimeStamp).toDateString() === new Date().toDateString()) {
            //今天
            if (H <= 12) {
                H = '上午' + H;
            } else if (H > 12 && H < 24) {
                H -= 12;
                H = '下午' + this.fillZero(H);
            } else if (H == 24) {
                H = '00';
            }
            var localTime = H + ':' + I;
        } else if (new Date(dateTimeStamp + day).toDateString() === new Date().toDateString()) {
            //昨天
            if (H <= 12) {
                H = '昨天上午' + H;
            } else if (H > 12 && H < 24) {
                H -= 12;
                H = '昨天下午' + this.fillZero(H);
            } else if (H == 24) {
                H = '00';
            }
            var localTime = H + ':' + I;
        }
        else if (new Date(dateTimeStamp) < new Date()) {
            var localTime = Y + '-' + M + '-' + D;
        }
        return localTime;
    }

    fillZero(v) {
        if (v < 10) { v = '0' + v; }
        return v;
    }


    moveAppToMorePage(id: number): Promise<Object> {
        return this.http.post(this.url + '/update', { id: id, show: false }).toPromise().then((res) => {
            return <Object>res.json();
        });
    }

    moveToAppPage(id: number) {
        return this.http.post(this.url + '/update', { id: id, show: true }).toPromise().then((res) => {
            return <Object>res.json();
        });
    }

    // mock data
    items: ApplicationItem[] = [{
        id: 1,
        href: '#',
        src: '../../assets/icon/book.ico',
        name: '图书管理',
        group: '工作相关',
        show: true
    }, {
        id: 2,
        href: '#',
        src: '../../assets/icon/todo.ico',
        name: '待办事宜',
        group: '工作相关',
        show: true
    }, {
        id: 3,
        href: '#',
        src: '../../assets/icon/finish.ico',
        name: '已办事宜',
        group: '工作相关',
        show: true
    }, {
        id: 4,
        href: '#',
        src: '../../assets/icon/meeting.ico',
        name: '会议',
        group: '企业应用',
        show: true
    }, {
        id: 5,
        href: '#',
        src: '../../assets/icon/schedule.ico',
        name: '日程',
        group: '企业应用',
        show: true
    }, {
        id: 6,
        href: '#',
        src: '../../assets/icon/news.ico',
        name: '新闻',
        group: '企业应用',
        show: true
    }, {
        id: 7,
        href: '#',
        src: '../../assets/icon/document.ico',
        name: '文档',
        group: '即时沟通',
        show: true
    }, {
        id: 8,
        href: '#',
        src: '../../assets/icon/weibo.ico',
        name: '微博',
        group: '商务出行',
        show: true
    }, {
        id: 9,
        href: '#',
        src: '../../assets/icon/teamwork.ico',
        name: '协作',
        group: '商务出行',
        show: false
    }, {
        id: 10,
        href: '#',
        src: '../../assets/icon/location.ico',
        name: '移动签到',
        group: '即时沟通',
        show: false
    }, {
        id: 11,
        href: '#',
        src: '../../assets/icon/offduty.ico',
        name: '假單維護',
        group: '企业应用',
        show: true
    }];

    history = [{
        "id": 1,
        "to": "mahuateng",
        "from": "Woody",
        "content": "小马哥，我穷",
        "msgtype": "text",
        "time": 1480338091398,
        "type": "dialogue"
    }, {
        "id": 2,
        "to": "Woody",
        "from": "mahuateng",
        "content": "300股，接着。",
        "msgtype": "text",
        "time": 1480338091399,
        "type": "dialogue"
    }, {
        "id": 3,
        "to": "dinglei",
        "from": "Woody",
        "content": "为什么你们家的猪那么贵。",
        "msgtype": "text",
        "time": 1480338091397,
        "type": "dialogue"
    }
        , {
        "id": 4,
        "to": "Woody",
        "from": "dinglei",
        "content": "因为他会飞。",
        "msgtype": "text",
        "time": 1488425432189,
        "type": "dialogue"
    }
        , {
        "id": 5,
        "to": "mayun",
        "from": "Woody",
        "content": "支付鸨，挺好。",
        "msgtype": "text",
        "time": 1480338091394,
        "type": "dialogue"
    }, {
        "id": 6,
        "to": "Woody",
        "from": "mayun",
        "content": "你懂的，嘿嘿。",
        "msgtype": "text",
        "time": 1480338091395,
        "type": "dialogue"
    }
        , {
        "id": 7,
        "to": "Woody",
        "from": "Slinky Dog",
        "content": "You heard of Kung Fu? Well get ready for pork chop. ",
        "msgtype": "text",
        "time": 1480338091393,
        "type": "notice",
    },
    {
        "id": 8,
        "to": "Woody",
        "from": "Slinky Dog",
        "content": "I may not be a smart dog, but I know what roadkill is.",
        "msgtype": "text",
        "time": 1480338091392,
        "type": "notice"
    }
        , {
        "id": 9,
        "to": "Woody",
        "from": "Barbie",
        "content": "So, who's ready for Ken's dream tour?",
        "msgtype": "text",
        "time": 1480338091391,
        "type": "notice"
    },
    {
        "id": 10,
        "to": "Woody",
        "from": "Squeeze",
        "content": "The claw is our master.",
        "msgtype": "text",
        "time": 1480338091390,
        "type": "notice"
    },
    {
        "id": 11,
        "to": "Woody",
        "from": "Squeeze",
        "content": "The claw is our master.",
        "msgtype": "text",
        "time": 1480338091390,
        "type": "notice"
    }, {
        "id": 20,
        "to": "mayun",
        "from": "mahuateng",
        "content": "300股，接着。",
        "msgtype": "text",
        "time": 1480338091400,
        "type": "dialogue"
    },{
        "id": 21,
        "to": "mahuateng",
        "from": "Woody",
        "content": "小马哥，我穷",
        "msgtype": "text",
        "time": 1480338091401,
        "type": "dialogue"
    }, {
        "id": 22,
        "to": "Woody",
        "from": "mahuateng",
        "content": "300股，接着。",
        "msgtype": "text",
        "time": 1480338091402,
        "type": "dialogue"
    },{
        "id": 23,
        "to": "mahuateng",
        "from": "Woody",
        "content": "小马哥，我穷",
        "msgtype": "text",
        "time": 1480338091403,
        "type": "dialogue"
    }, {
        "id": 24,
        "to": "Woody",
        "from": "mahuateng",
        "content": "300股，接着。",
        "msgtype": "text",
        "time": 1480338091404,
        "type": "dialogue"
    },{
        "id": 25,
        "to": "mahuateng",
        "from": "Woody",
        "content": "小马哥，我穷",
        "msgtype": "text",
        "time": 1480338091406,
        "type": "dialogue"
    }, {
        "id": 26,
        "to": "Woody",
        "from": "mahuateng",
        "content": "300股，接着。",
        "msgtype": "text",
        "time": 1480338091407,
        "type": "dialogue"
    },{
        "id": 27,
        "to": "mahuateng",
        "from": "Woody",
        "content": "小马哥，我穷",
        "msgtype": "text",
        "time": 1480338091408,
        "type": "dialogue"
    }, {
        "id": 28,
        "to": "Woody",
        "from": "mahuateng",
        "content": "300股，接着。",
        "msgtype": "text",
        "time": 1480338091409,
        "type": "dialogue"
    },{
        "id": 29,
        "to": "mahuateng",
        "from": "Woody",
        "content": "小马哥，我穷",
        "msgtype": "text",
        "time": 1480338091410,
        "type": "dialogue"
    }, {
        "id": 30,
        "to": "Woody",
        "from": "mahuateng",
        "content": "300股，接着。",
        "msgtype": "text",
        "time": 1480338091411,
        "type": "dialogue"
    },{
        "id": 31,
        "to": "mahuateng",
        "from": "Woody",
        "content": "小马哥，我穷",
        "msgtype": "text",
        "time": 1480338091412,
        "type": "dialogue"
    }, {
        "id": 32,
        "to": "Woody",
        "from": "mahuateng",
        "content": "300股，接着。",
        "msgtype": "text",
        "time": 1480338091413,
        "type": "dialogue"
    },{
        "id": 33,
        "to": "mahuateng",
        "from": "Woody",
        "content": "小马哥，我穷",
        "msgtype": "text",
        "time": 1480338091414,
        "type": "dialogue"
    }, {
        "id": 34,
        "to": "Woody",
        "from": "mahuateng",
        "content": "assets/img/avatar-ts-woody.png",
        "msgtype": "img",
        "time": 1480338091415,
        "type": "dialogue"
    }, {
        "id": 35,
        "to": "mahuateng",
        "from": "Woody",
        "content": "assets/img/avatar-ts-woody.png",
        "msgtype": "img",
        "time": 1480338091416,
        "type": "dialogue"
    }];

    userinfo = {
        id: 'Woody',
        name: '小明',
        src: 'assets/img/avatar-ts-woody.png',
    }
}
