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
  filteredStories: any[] = [];
  searchQuery: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(private storyService: StoryService) {}

  ngOnInit(): void {
    this.fetchStories();
  }

  fetchStories(): void {
    this.loading = true;
    this.storyService.getStories(this.page).subscribe({
      next: (data) => {
        this.stories = data;
        this.applySearch();
        setTimeout(() => {         
        this.loading = false;
        }, 1000);
        
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  applySearch(): void {
    if (this.searchQuery) {
      this.filteredStories = this.stories.filter(story =>
        story.title?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredStories = [...this.stories];
    }
  }

  onSearchChange(): void {
    this.applySearch();
  }

  nextPage(): void {
    this.page++;
    this.fetchStories();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.fetchStories();
    }
  }
}
