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
   private apiUrl = 'http://127.0.0.1:8000/api';
  // private apiUrl = 'https://melodious-recreation-production.up.railway.app/api';
  
constructor(private http: HttpClient, private auth: AuthService, private router: Router )
  {
    this.getAllTasks();
  }

  getAllTasks() {
  const headers = { Authorization: `Bearer ${this.auth.getToken()}` };

  this.http.get(`${this.apiUrl}/task`, { headers })
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

    this.http.post(`${this.apiUrl}/task`, bodyData, { headers })
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

    this.http.put(`${this.apiUrl}/task/${this.currentTaskID}`, bodyData, { headers })
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

    this.http.delete(`${this.apiUrl}/task/${data.id}`, { headers })
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
