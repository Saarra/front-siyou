import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { DownloadComponent } from './components/download/download.component';
import { InterlocutorsComponent } from './components/interlocutors/interlocutors.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductsComponent } from './components/products/products.component';


const routes: Routes = [
 {
   path: 'home',
   component: HomeComponent
 }, 
 {
  path: 'products',
  component: ProductsComponent
  },
 {
   path: 'download',
   component: DownloadComponent
 },
 {
   path: 'interlocutors',
   component: InterlocutorsComponent
 },
 {
   path: 'contact',
   component: ContactComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
