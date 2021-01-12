import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent implements OnInit, AfterViewInit {
  @ViewChild('flipbook', { static: false }) flipbook: ElementRef;
  constructor() { }
  ngOnInit() {
  }
  ngAfterViewInit() {
    $(this.flipbook.nativeElement).turn({
      width: 400,
      height: 300,
      autoCenter: true
    });
  }
}
