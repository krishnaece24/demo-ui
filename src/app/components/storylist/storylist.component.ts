import { Component, OnInit } from '@angular/core';
import { StoryService, Story } from '../../services/story.service';
import { MatProgressSpinner, MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-storylist',
  templateUrl: './storylist.component.html',
  styleUrls: ['./storylist.component.scss']
})
export class StorylistComponent implements OnInit {

  stories: Story[] = [];
  loading = false;

  constructor(private storyService: StoryService) {}

  ngOnInit(): void {
    this.fetchStories();
  }

  fetchStories(): void {
    this.loading = true;
    this.storyService.getStories().subscribe({
      next: (data) => {
        this.stories = data;
        setTimeout(() => {         
        this.loading = false;
        }, 1000);
        
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
