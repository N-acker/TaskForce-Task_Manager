import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // fixed path

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {}

  login() {
  this.auth.login(this.email, this.password).subscribe(
    (res: any) => {
      if (res.token) {
        this.auth.setToken(res.token);
        this.router.navigate(['/tasks']);
      } else {
        alert('Invalid credentials');
      }
    },
    () => alert('Invalid credentials')
  );
}




}

