import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { AuthService } from "@services/auth.service";
import { LoginService } from "@services/login.service";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    loading! : boolean

    loginReqDto = this.fb.group({
        userEmail: ['', [Validators.required]],
        userPassword: ['', [Validators.required]]
    })

    constructor(
        private authService: AuthService,
        private loginService: LoginService,
        private fb: NonNullableFormBuilder,
        private router : Router,
        private title : Title) { 
            this.title.setTitle('Login | Learning Management System')
        }

    onLogin() {
        if (this.loginReqDto.valid) {
            const data = this.loginReqDto.getRawValue()
            this.loading = true
            this.loginService.login(data).subscribe(result => {
                localStorage.setItem('data', JSON.stringify(result))
                this.loading = false
                this.router.navigateByUrl('/dashboard')
            })
            this.loading = false
        } else {
            console.log('Go Away!')
        }
    }
}