//creates the teacher login field component
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

export type LoginPayload = { username: string; password: string };

@Component({
  selector: 'app-tloginfield',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tloginfield.html',
  styleUrls: ['./tloginfield.scss']
})
export class Tloginfield {
  @Output() login = new EventEmitter<LoginPayload>();
  @Output() forgotPassword = new EventEmitter<void>();

  loading = false; // kann von außen per Input nachgerüstet werden

  form = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
  });

  get username() { return this.form.controls.username; }
  get password() { return this.form.controls.password; }

  submit(ev?: Event) {
    ev?.preventDefault();
    ev?.stopPropagation();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const payload: LoginPayload = {
      username: this.username.value.trim(),
      password: this.password.value
    };

    // hier würdest du später deinen Service callen
    // this.authService.login(payload).subscribe({ ... });
    // fürs Gerüst emitten wir direkt:
    this.login.emit(payload);
    this.loading = false;
    
  }

  onForgot() { this.forgotPassword.emit(); }
}