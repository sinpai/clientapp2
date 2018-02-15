import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  @ViewChild('registerForm') form: any;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe( auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    if ( this.form.invalid ) {
      this.flashMessage.show( 'Input is incorrect. Please fill in the form', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      this.authService.register(this.email, this.password)
        .then(res => {
          this.flashMessage.show('You are registered and logged in', {
            cssClass: 'alert-success', timeout: 4000
          });
          this.router.navigate(['/']);
        })
        .catch( err => {
          this.flashMessage.show(err, {
            cssClass: 'alert-danger', timeout: 4000
          });
        });
    }
  }
}
