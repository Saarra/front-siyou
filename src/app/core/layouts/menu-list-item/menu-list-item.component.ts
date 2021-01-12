import { Component, OnInit, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { NavItem } from 'src/app/shared/models/nav-item';
import { Router } from '@angular/router';
import { NavService } from '../../services/nav.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {
  expanded: boolean = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;

  constructor(public navService: NavService,
              public router: Router,
              public translate: TranslateService) {
    if (this.depth === undefined) {
      this.depth = 0;
    }

    translate.addLangs(['English', 'Italian','Chinese']);
    // translate.setDefaultLang('English');
  }

  ngOnInit() {

    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
      
      }
    });
  }
link;
name;
  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
      this.link=item.route;
      this.name=item.displayName;
      this.navService.sendLink(this.link);
      this.navService.sendName(this.name);
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

clearMessages(): void {
    this.navService.clearLinks();
}
}
