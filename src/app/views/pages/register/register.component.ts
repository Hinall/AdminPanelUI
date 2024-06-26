import { Component, OnInit } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';
// import {User }  from 'src/models/user'
import { HttpClientModule,HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [HttpClientModule,ReactiveFormsModule,RouterModule,ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective],
    providers:[HttpClient,UserService]
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  constructor(private fb: FormBuilder,private service:UserService,private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [[]]
    });
  }
  ngOnInit(): void {
   
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // let user = new User(
      //   this.registerForm.value['username'],
      //   this.registerForm.value['email'],
      //   this.registerForm.value['password'],
      //   this.registerForm.value['role']
      // );
      let formdata = {
        username: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        role: ['user']// Assuming 'user' role by default
      };
      this.service.signUp(formdata).subscribe((data: any) => {
        alert(data.message);
        this.router.navigate(['/login']);
    
      });
    } else {
      console.log('Form is invalid');
    }
  }

}
