import { NgModule } from '@angular/core';
import { MenuListItemComponent } from '../core/layouts/menu-list-item/menu-list-item.component';
import { MatIconModule, MatListModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        MenuListItemComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatListModule
    ],
    exports: [
        MenuListItemComponent
    ]
})
export class SharedModule { }
