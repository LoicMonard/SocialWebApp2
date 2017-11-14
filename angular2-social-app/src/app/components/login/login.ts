import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'models';
import { AuthenticationService } from '../../services/index';

/**
 * Log a user
 */
@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginComponent  {
    model = new UserLogin();
    failed = false;
    constructor(
            private authService: AuthenticationService,
            private router : Router
    ) { }

    login() {
        // use authService to authenticate and router to redirect
        this.authService.authenticate(this.model)
        .then(() => {
            this.router.navigate(link);
            this.failed = false;
            })
            .catch(() => {
                console.log("Suarezito le minable");
                this.failed = true;
            });
        const link = ['/'];
        ;
    }
}
