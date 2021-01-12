import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);
  private subject = new Subject<any>();
  private subjectName = new Subject<any>();


  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }


  sendLink(link) {
    this.subject.next(link);
  }
  sendName(name) {
    this.subjectName.next(name);
  }

  clearLinks() {
    this.subject.next();
  }

  onLink(): Observable<any> {
   return this.subject.asObservable();
    
  }
  onName(): Observable<any> {
return this.subjectName.asObservable();
   
 }

}
