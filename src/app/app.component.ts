import { Component, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output() browserInfo = {
    name: navigator.userAgent,
    unsupported: false,
    warningDismissed: false
  }

  constructor(
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.browserInfo.unsupported = isSafari || isIE
    this.browserInfo.warningDismissed = !!this.cookieService.get('safariBrowserWarningDismissed')
  }

  dismissBrowserWarning() {
    this.cookieService.set('safariBrowserWarningDismissed', '1', 1)
    location.reload()
  }
}

// @ts-ignore Safari 3.0+ "[object HTMLElementConstructor]"
const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

// @ts-ignore Internet Explorer 6-11
const isIE = /*@cc_on!@*/false || !!document.documentMode;
