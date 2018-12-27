import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('appContainer') appContainer: ElementRef;

  NotchOrientation: NotchOrientation; // enum ref

  isNotch: boolean;

  notchOrientation: NotchOrientation;

  title = 'app';

  getInnerHeight() {
    return window.innerHeight;
  }
  getInnerWidth() {
    return window.innerWidth;
  }

  ngOnInit(): void {
    this.detectIos();
  }




  detectIos() {
    // Really basic check for the ios platform
    // https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
    let iOS = /ipad|iphone|ipod/.test(navigator.userAgent.toLowerCase());

    // Get the device pixel ratio
    let devicePixelRatio = window.devicePixelRatio || 1;

    // Define the users device screen dimensions
    let screen = {
      width: window.screen.width * devicePixelRatio,
      height: window.screen.height * devicePixelRatio
    };

    // iPhone X Detection
    if (iOS && this.isXModel()) {

      // Set a global variable now we've determined the iPhoneX is true
      this.isNotch = true;

      // Adds a listener for ios devices that checks for orientation changes.
      window.addEventListener('orientationchange', this.update);
      this.update();
    }

    // Each time the device orientation changes, run this update function

    // Notch position checker

  }

  update() {
    this.notch();
    // this.iphoneXChecker();
  }
  notch() {
    this.notchOrientation = NotchOrientation.top;

    if ('orientation' in window) {
      // Mobile
      if (window.orientation == 90) {
        this.notchOrientation = NotchOrientation.left;
      } else if (window.orientation == -90) {
        this.notchOrientation = NotchOrientation.right;
      }
    } else if ('orientation' in (<any>window).screen) {
      // Webkit
      if ((<any>screen).orientation.type === 'landscape-primary') {
        this.notchOrientation = NotchOrientation.left;
      } else if ((<any>screen).orientation.type === 'landscape-secondary') {
        this.notchOrientation = NotchOrientation.right;
      }
    } else if ('mozOrientation' in (<any>window).screen) {
      // Firefox
      if ((<any>screen).mozOrientation === 'landscape-primary') {
        this.notchOrientation = NotchOrientation.left;
      } else if ((<any>screen).mozOrientation === 'landscape-secondary') {
        this.notchOrientation = NotchOrientation.right;
      }
    }

  }


  isXModel() {
    let isXModel = false;
    if (screen.width === 1125 && screen.height === 2436
      ||
      screen.width === 2436 && screen.height === 1125
      ||
      screen.width === 1242 && screen.height === 2688
      ||
      screen.width === 2688 && screen.height === 1242
      ||
      screen.width === 828 && screen.height === 1792
      ||
      screen.width === 1792 && screen.height === 828
    ) {
      isXModel = true;
    }
    return isXModel;
  }


  getNgClass(){
    return {
      'notch-top': this.notchOrientation === NotchOrientation.top,
      'notch-right': this.notchOrientation === NotchOrientation.right,
      'notch-left': this.notchOrientation === NotchOrientation.left
    }
  }

}


enum NotchOrientation {
  top = 1,
  right = 2,
  bottom = 3,
  left = 4
}