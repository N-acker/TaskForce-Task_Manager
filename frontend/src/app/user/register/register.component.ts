import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  password_confirmation = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
  this.auth.register({
    name: this.name,
    email: this.email,
    password: this.password,
    password_confirmation: this.password_confirmation
  }).subscribe({
    next: (res: any) => {
      this.auth.setToken(res.token);
      this.router.navigate(['/tasks']);
    },
    error: (err) => {
      if (err.status === 422 && err.error && err.error.errors) {
        const messages = Object.values(err.error.errors).flat();
        alert(messages.join('\n')); // Show all validation messages
      } else {
        alert('An unexpected error occurred. Please try again.');
      }

      console.error('Registration error:', err);

      this.name = "";
      this.email = "";
      this.password = "";
      this.password_confirmation = "";
    }
    });
  }
}
