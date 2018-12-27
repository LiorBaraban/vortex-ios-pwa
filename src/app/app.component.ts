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
  isIOS: boolean;
  showImage: boolean;

  notchOrientation: NotchOrientation;
  screen: any
  imgSrc: string;

  title = 'app';

  getInnerHeight() {
    return window.innerHeight;
  }
  getInnerWidth() {
    return window.innerWidth;
  }

  ngOnInit(): void {
    this.isIOS = false;
    this.isNotch = false;
    this.showImage = false;
    
    this.detectIos();
  }




  detectIos() {
    // Really basic check for the ios platform
    // https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
    this.isIOS = /ipad|iphone|ipod/.test(navigator.userAgent.toLowerCase());

    // Get the device pixel ratio
    let devicePixelRatio = window.devicePixelRatio || 1;

    // Define the users device screen dimensions
    this.screen = {
      width: window.screen.width * devicePixelRatio,
      height: window.screen.height * devicePixelRatio
    };

    // iPhone X Detection
    if (this.isIOS && this.isXModel()) {

      // Set a global variable now we've determined the iPhoneX is true
      this.isNotch = true;

      // Adds a listener for ios devices that checks for orientation changes.
      window.addEventListener('orientationchange', this.update.bind(this));
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
    if (this.screen.width === 1125 && this.screen.height === 2436
      ||
      this.screen.width === 2436 && this.screen.height === 1125
      ||
      this.screen.width === 1242 && this.screen.height === 2688
      ||
      this.screen.width === 2688 && this.screen.height === 1242
      ||
      this.screen.width === 828 && this.screen.height === 1792
      ||
      this.screen.width === 1792 && this.screen.height === 828
    ) {
      isXModel = true;
    }
    return isXModel;
  }


  getNgClass() {
    return {
      'notch-top': this.isNotch && this.notchOrientation === NotchOrientation.top,
      'notch-right': this.isNotch && this.notchOrientation === NotchOrientation.right,
      'notch-left': this.isNotch && this.notchOrientation === NotchOrientation.left,
      'regular-top': !this.isNotch
    }
  }

  onClick() {
    this.showImage = !this.showImage;
  }

  fileInputChange(event) {

    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = e => this.imgSrc = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

}


enum NotchOrientation {
  top = 1,
  right = 2,
  left = 3
}