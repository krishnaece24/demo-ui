import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoryService } from 'src/app/services/story.service';
import { AppConfigService } from 'src/app/services/appconfig.service';
import { Injectable } from '@angular/core';

const mockConfigService = {
  getSetting: (key: string) : any => {
    if(key=="HackerApiUrl"){
      return 'https://localhost:44392/api/Stories/GetNewStories';
    }
    else{
      return '1';
    }
  }
};

describe('StoryService', () => {
  let service: StoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoryService,
        { provide: AppConfigService, useValue: mockConfigService }
      ]
    });
    service = TestBed.inject(StoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch stories', () => {
    const mockStories = [{"title":"Show HN: Clippy – 90s UI for local LLMs","url":"https://felixrieseberg.github.io/clippy/"}];

    service.getStories(1).subscribe(stories => {
      expect(stories[0].title).toBe('Show HN: Clippy – 90s UI for local LLMs');
    });

    const reqIds = httpMock.expectOne('https://localhost:44392/api/Stories/GetNewStories?page=1&pagesize=1');
    expect(reqIds.request.method).toBe('GET');
    reqIds.flush(mockStories);    
  });
  afterEach(() => {
    httpMock.verify();
  });

});