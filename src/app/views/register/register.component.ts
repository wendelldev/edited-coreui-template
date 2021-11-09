import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      passwordConfirmation: [null]
    })
  }

  createAccount() {
    if (this.formGroup.valid) {
      this.usersService.registerUser(this.formGroup.value).subscribe(
        (data: any) => {
          console.log(data)
        },
        error => console.log(error)
      )
    } else {
      console.log('Inválido')
    }
  }

}
