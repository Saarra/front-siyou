import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {MatStepperModule} from '@angular/material/stepper';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
import { MatCardModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatDialogModule,
        MatSelectModule,
        MatOptionModule,
        MatTooltipModule,
        MatMenuModule,
        MatBadgeModule,
        MatSortModule,
        MatRadioModule,
        MatTabsModule
        } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxPopperModule } from 'ngx-popper';
import { ChartsModule } from 'ng2-charts';
import { MdcImageListModule } from '@angular-mdc/web';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Ng5SliderModule } from 'ng5-slider';
import { AgmCoreModule } from '@agm/core';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChangePasswordRequestComponent } from './components/change-password-request/change-password-request.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ChangePasswordComponent,
    ChangePasswordRequestComponent,
    

  ],
  imports: [
    CommonModule,
    MatCardModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    // added modules
    TranslateModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPopperModule.forRoot(),
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    ChartsModule,
    MatTooltipModule,
    MdcImageListModule,
    SlickCarouselModule,
    MatMenuModule,
    Ng5SliderModule,
    MatBadgeModule,
    MatSortModule,
    MatSnackBarModule,
    MatRadioModule,
    MatTabsModule,
    AgmCoreModule


  ],
  providers: [
    AuthenticationService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LoginModule { }
