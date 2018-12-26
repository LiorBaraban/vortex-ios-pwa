import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  down: boolean = false;

  onMouseDown(event){
    console.log('down');
    this.down = true;
  }
  onMouseUp(event){
    console.log('up');
    this.down = false;
  }
}
