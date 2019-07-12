import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-protocol',
    templateUrl: 'protocol.page.html',
    styleUrls: ['protocol.page.scss']
})
export class ProtocolPage {

    ifAccept: boolean;

    constructor(private router: Router) {
        this.ifAccept = false;
    }

    notAccept() {
        this.ifAccept = false;
        this.router.navigate(['/register']);
    }

    accept() {
        this.ifAccept = true;
        this.router.navigate(['/register']);
    }

}
