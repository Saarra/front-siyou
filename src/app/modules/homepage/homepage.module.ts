import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import {HomepageRoutingModule} from './homepage-routing.module';
import { InterlocutorsComponent } from './components/interlocutors/interlocutors.component';
import { ProductsComponent } from './components/products/products.component';
import { DownloadComponent } from './components/download/download.component';
import { ContactComponent } from './components/contact/contact.component';


@NgModule({
  declarations: [NavbarComponent, FooterComponent, AboutComponent, HomeComponent, InterlocutorsComponent, ProductsComponent, DownloadComponent, ContactComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule
  ]
})
export class HomepageModule { }
