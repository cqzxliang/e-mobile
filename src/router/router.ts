import { NavController, NavParams } from 'ionic-angular';
import { BookLibraryPage } from '../pages/book-library/book-library';
import { OffdutyPage } from '../pages/offduty/offduty';
import { NoticePage } from '../pages/notice/notice';
import { DialoguePage } from '../pages/dialogue/dialogue';

export class MyRouter {
    constructor() { }

    public go(navCtrl: NavController, navParams: NavParams, id: number): void {
        switch (id) {

            case 1:
                navCtrl.push(BookLibraryPage);
                break;
            case 11:
                navCtrl.push(OffdutyPage);
                break;
            default:
                break;

        }

    }

    public goMessageDetail(navCtrl: NavController, navParams: NavParams, nameid: number, name: string, msg: string, type: string) {
        if (type === "notice") {
            navCtrl.push(NoticePage, { nameid: nameid, name: name, msg: msg });
        } else if (type === "dialogue") {
            navCtrl.push(DialoguePage, { nameid: nameid,name:name });
        }
    }

}
