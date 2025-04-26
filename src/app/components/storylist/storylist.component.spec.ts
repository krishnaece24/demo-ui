import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoryService } from 'src/app/services/story.service';

describe('StoryService', () => {
  let service: StoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoryService]
    });
    service = TestBed.inject(StoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch stories', () => {
    const mockStories = [{ title: 'Story Number 1', url: 'Story Url 1' }];

    service.getStories().subscribe(stories => {
      expect(stories[0].title).toBe('Story Number 1');
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockStories);
  });

  afterEach(() => {
    httpMock.verify();
  });
});