import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  mobileQuery: MediaQueryList;

  constructor(private media: MediaMatcher) {
    
    this.mobileQuery = media.matchMedia('(max-width: 1200px)');
  }

  ngOnInit() {
  }

}
