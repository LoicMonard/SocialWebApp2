import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/index';
import { UserRegistration } from 'models';
import { NgForm } from '@angular/forms';

/**
 * Registration for new user
 */
@Component({
    selector: 'register',
    templateUrl: 'register.html'
})
export class RegisterComponent {
    @ViewChild(NgForm)
    ngForm: NgForm;

    model = new UserRegistration();
    failed: boolean = false;

    constructor(
        private registrationService: RegistrationService,
        private router: Router
    ) { }

    register() {
        if (this.ngForm.form.invalid) {
            return;
        }

        this.registrationService.usernameExists(this.model.username)
        .then( userExists => {
            if(userExists) {
                this.failed = true;
            }
            else {
                // register user with registrationService
                this.failed = false;
                this.registrationService.register(this.model);
                const link = ['/login'];
                this.router.navigate(link);
            }
        })
        
    }
}
