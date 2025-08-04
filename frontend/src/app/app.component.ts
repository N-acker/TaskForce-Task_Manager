import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; //added
// import { TaskComponent } from './task/task.component'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet], //added
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-app';
}
