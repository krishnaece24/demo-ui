import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppConfigService } from './app/services/appconfig.service';
import { HttpClient } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}


fetch('/assets/appsettings.json')
  .then(response => response.json())
  .then(config => {
    const configService = new AppConfigService(new HttpClient(null as any));
    configService['config'] = config;
    platformBrowserDynamic([{ provide: AppConfigService, useValue: configService }])
      .bootstrapModule(AppModule)
      .catch(err => console.error(err));
  });
