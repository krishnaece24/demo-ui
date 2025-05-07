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

  constructor(private http: HttpClient, private configService: AppConfigService) { }

  getStories(page: number): Observable<Story[]> {
    var apiUrl = this.configService.getSetting("HackerApiUrl");
    var pageSize = this.configService.getSetting("PageSize");
    return this.http.get<Story[]>(apiUrl + "?page=" + page + "&pagesize=" + pageSize);

  }
}