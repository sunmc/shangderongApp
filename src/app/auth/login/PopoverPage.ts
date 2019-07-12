import { PopoverController } from '@ionic/angular';
import {Component} from '@angular/core';
import { Storage } from '@ionic/storage';
import {User} from '../../bean/User';

@Component({
    template: `
    <ion-list>
      <ion-item *ngFor="let u of us" (click)="useThis(u)">
        <ion-label>{{u.phone}}</ion-label>
      </ion-item>
    </ion-list>
  `
})
export class PopoverPage {

    us: User[];
    constructor(public popoverCtrl: PopoverController, private storage: Storage) {
        this.storage.get('loginList').then((val) => {
            if (val) {
                this.us = val;
            }
        });
    }
    useThis(u: User) {
        u.autoLogin = false;
        this.storage.set('loginInfo', u);
        location.reload(true);
    }

    support() {
        // this.app.getRootNavs()[0].push('/support');
        this.popoverCtrl.dismiss();
    }

    close(url: string) {
        window.open(url, '_blank');
        this.popoverCtrl.dismiss();
    }

}
