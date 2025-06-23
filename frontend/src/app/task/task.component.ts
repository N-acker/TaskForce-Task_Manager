import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Needed for *ngIf, *ngFor
import { FormsModule } from '@angular/forms';   // Needed for [(ngModel)]
import { Router } from '@angular/router'; 
import { AuthService } from '../services/auth.service'; 


@Component({
  selector: 'app-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  taskArray : any[] = [];
  isResultLoaded = false;
 
  
  task: string ="";
  description: string ="";
  dueDate: string ="";
  currentTaskID = "";
  
constructor(private http: HttpClient, private auth: AuthService, private router: Router )
  {
    this.getAllTasks();
  }

  getAllTasks() {
  const headers = { Authorization: `Bearer ${this.auth.getToken()}` };

  this.http.get("http://127.0.0.1:8000/api/task", { headers })
    .subscribe((resultData: any) => {
      this.isResultLoaded = true;
      console.log(resultData);
      this.taskArray = resultData;
    });
  }


  createTask() {
    const bodyData = {
      "task_name": this.task,
      "description": this.description,
      "due_date": this.dueDate
    };

    const headers = { Authorization: `Bearer ${this.auth.getToken()}` };

    this.http.post("http://127.0.0.1:8000/api/task", bodyData, { headers })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Task Added Successfully");
        this.getAllTasks();
        this.task = '';
        this.description = '';
        this.dueDate = '';
      });
}

  
  setUpdate(data: any)
  {
   this.task = data.task_name;
   this.description = data.description;
   this.dueDate = data.due_date;
   this.currentTaskID = data.id;
  }
 
  UpdateRecords() {
    const bodyData = {
      "id": this.currentTaskID,
      "task_name": this.task,
      "description": this.description,
      "due_date": this.dueDate
    };

    const headers = { Authorization: `Bearer ${this.auth.getToken()}` };

    this.http.put(`http://127.0.0.1:8000/api/task/${this.currentTaskID}`, bodyData, { headers })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Task Updated");
        this.getAllTasks();
        this.task = '';
        this.description = '';
        this.dueDate = '';
      });
}

 
  save()
  {
    if(this.currentTaskID == '')
    {
        this.createTask();
    }
      else
      {
       this.UpdateRecords();
      }      
 
  }
 
  setDelete(data: any) {
    const headers = { Authorization: `Bearer ${this.auth.getToken()}` };

    this.http.delete(`http://127.0.0.1:8000/api/task/${data.id}`, { headers })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Task Deleted");
        this.getAllTasks();
        this.task = '';
        this.description = '';
        this.dueDate = '';
      });
}


  logout() {
    this.auth.logout().subscribe(() => {
    this.auth.clearToken();
    this.router.navigate(['/login']);
  });
}

}
