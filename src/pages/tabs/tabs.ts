import { Component } from '@angular/core';

import { MessagePage } from '../message/message';
import { ApplicationPage } from '../application/application';
import { NamesPage } from '../names/names';
import { MePage } from '../me/me';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = MessagePage;
  tab2Root: any = ApplicationPage;
  tab3Root: any = NamesPage;
  tab4Root: any = MePage;

  constructor() {

  }
}
