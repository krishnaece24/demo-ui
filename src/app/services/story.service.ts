import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from './appconfig.service';

export interface Story {
  title: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  apiUrl = this.configService.getSetting("HackerApiUrl");
  constructor(private http: HttpClient, private configService: AppConfigService) {}

  getStories(): Observable<Story[]> {
    return this.http.get<Story[]>(this.apiUrl);
  }
}