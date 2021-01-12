import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class UpdateAppService {

  constructor(private swUpdate: SwUpdate) {
  }

  getAvailableUpdates() {
    return this.swUpdate.available;
  }
}
