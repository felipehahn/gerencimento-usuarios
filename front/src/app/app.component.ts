import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title:string = 'gerenciamento-usuarios';
  url:string = ''

  constructor(private route: Router, private location: Location) {
    route.events.subscribe((val) => {
      this.url = location.path();
    });
  }
}
