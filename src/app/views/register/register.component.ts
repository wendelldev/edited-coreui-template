import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Cidade } from '../../models/cidades';
import { EstadoBr } from '../../models/estado-br';
import { DropdownService } from '../../services/dropdown.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  cidades: Cidade[];
  estados: EstadoBr[];
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private dropDownService: DropdownService
  ) {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      passwordConfirmation: [null],
      state: ["", [Validators.required]],
      city: [""],
    })
  }

  ngOnInit() {
    this.dropDownService.getEstadosBr().subscribe(
      (data: any) => {
        this.estados = data
      }
    )

    this.formGroup.get('state').valueChanges
      .pipe(
        map(state => this.estados.filter(e => e.sigla === state)),
        map(states => states && states.length > 0 ? states[0].id : EMPTY),
        switchMap((stateId: number) => this.dropDownService.getCidades(stateId)),
      )
      .subscribe(cities => this.cidades = cities);
  }

  createAccount() {
    if (this.formGroup.valid) {
      // this.usersService.registerUser(this.formGroup.value).subscribe(
      //   (data: any) => {
      //     console.log(data)
      //   },
      //   error => console.log(error)
      // )
      console.log(this.formGroup.value)
    } else {
      console.log('Inválido')
    }
  }

}
