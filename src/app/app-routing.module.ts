import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorylistComponent } from './components/storylist/storylist.component';

const routes: Routes = [
  { path: '', component: StorylistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
