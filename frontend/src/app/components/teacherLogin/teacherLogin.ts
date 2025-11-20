import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './teacherLogin.html',
  styleUrls: ['./teacherLogin.scss']
})
export class teacherLogin {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log('Formular abgeschickt');

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      console.log('Formular ist ungültig');
      return;
    }

    const { username, password } = this.loginForm.value;
    // TODO: Login-Logik einbauen
    
    if (username === 'test@testmail.de' && password === 'test') {
      console.log('Erfolgreich eingeloggt!');
      this.router.navigate(['/teacherOverview']);
    }
    
    console.log('Login mit:', username, password);
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
}
