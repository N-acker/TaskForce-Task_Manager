import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; //added
import { TaskComponent } from './task/task.component'; //added

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskComponent], //added
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-app';
}
