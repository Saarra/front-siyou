import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './modules/login/login.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthInterceptorService } from './core/interceptors/auth-interceptor.service';
import { UpdateAppService } from './core/services/update-app.service';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatCheckboxModule, MatExpansionModule, MatDialogModule, MatInputModule, MatCardModule, MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatGridListModule, MatTooltipModule, MatMenuModule, MatSnackBarModule, MatBadgeModule, MatTabsModule, MatDatepickerModule } from '@angular/material';
import { UserService } from './shared/services/user.service';
import { CommissionsService } from './shared/services/commissions.service';
import { AgmCoreModule } from '@agm/core'
import { MatChipsModule } from '@angular/material/chips';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DashboardShopS2cLayoutComponent } from './core/layouts/dashboard-shop-s2c-layout/dashboard-shop-s2c-layout.component';
import { ExcelService } from './shared/services/excel.service';
import { MatFormFieldModule } from '@angular/material';
import { NgApexchartsModule } from "ng-apexcharts";
import { FormsModule }   from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

 import { ReactiveFormsModule } from '@angular/forms';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatCheckboxModule, MatExpansionModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatCardModule, MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatGridListModule, MatTooltipModule, MatMenuModule, MatSnackBarModule, MatBadgeModule, MatTabsModule, MatDatepickerModule,
    MatFormFieldModule,
    LoginModule,
    DashboardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DragDropModule,
    MatChipsModule,
    NgxMatSelectSearchModule,
    NgApexchartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBxVogDZDIrjbDsGfdj0pSbKjxMs4XZFUw'
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    UpdateAppService,
    UserService,
    CommissionsService,
    ExcelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
