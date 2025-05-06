import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  async load(): Promise<void> {
    this.config = await firstValueFrom(this.http.get('/assets/appsettings.json'));
  }

  getConfig(): any {
    return this.config;
  }

  getSetting(key: string): any {
    return this.config ? this.config[key] : null;
  }
}