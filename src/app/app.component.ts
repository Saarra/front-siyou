import { Component } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { MatSnackBar, MatSnackBarRef } from "@angular/material";
import { MediaMatcher } from "@angular/cdk/layout";
import { UpdateAppService } from "./core/services/update-app.service";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  _title = "templatetestangular";
  languageList = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "es", label: "Espanol" },
  ];
  mobileQuery: MediaQueryList;
  title = "SiyouB2B";
  snackBarRef: MatSnackBarRef<any>;
  constructor(
    private updates: SwUpdate,
    private snackBar: MatSnackBar,
    private media: MediaMatcher,
    private updateAppService: UpdateAppService,
    public translate: TranslateService
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this.updateAppService.getAvailableUpdates().subscribe((event) => {
      this.snackBarRef = this.snackBar.open(this.translate.currentLang === 'Chinese' ? "检查到更新":this.translate.currentLang === 'Italian' ? "Rilevato nuovo aggiornamento": "New Update Detected" , "Refresh", {
        duration: 5000,
        horizontalPosition: this.mobileQuery.matches ? "center" : "right",
        verticalPosition: "bottom",
      });
      this.snackBarRef.onAction().subscribe(() => {
        window.location.reload();
      });
    });
    translate.addLangs(["English", "Italian", "Chinese", "Français"]);
    
    var userLang = navigator.language;
    if (userLang == "zh-TW") {
      translate.currentLang = "Chinese";
      translate.setDefaultLang("Chinese");
    } else if (userLang == "zh-CN") {
      translate.currentLang = "Chinese";
      translate.setDefaultLang("Chinese");
    } else if (userLang == "fr-FR") {
      translate.currentLang = "Français";
      translate.setDefaultLang("Français");
    } else if (userLang == "it-IT") {
      translate.currentLang = "Italian";
      translate.setDefaultLang("Italian");
    } else if ((userLang == "en-EN") || (userLang == "en-US")) {
      translate.currentLang = "English";
      translate.setDefaultLang("English");
    } else {
      translate.currentLang = "English";
      translate.setDefaultLang("English");
    }
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
