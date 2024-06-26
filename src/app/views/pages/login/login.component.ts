import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { RouterModule, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    providers:[HttpClient,UserService],
    imports: [HttpClientModule,ReactiveFormsModule,RouterModule,RouterModule,ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,private service:UserService,private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
   
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
   
      let formdata = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value,
      };
      this.service.signIn(formdata).subscribe((data: any) => {
        
        this.router.navigate(['/dashboard']);
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('id', data.id);
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
        localStorage.setItem('roles', data.roles);
        localStorage.setItem('tokenType', data.tokenType);
        localStorage.setItem('accessToken', data.accessToken);
      
        // this.authorizationCheckService.modules = data.data[0].modules;
        alert('Login Success');
    
      });
    } else {
      console.log('Form is invalid');
    }
  }

}
