import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Story {
  title: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  private apiUrl = 'https://localhost:44392/api/Stories';

  constructor(private http: HttpClient) {}

  getStories(): Observable<Story[]> {
    return this.http.get<Story[]>(this.apiUrl);
  }
}