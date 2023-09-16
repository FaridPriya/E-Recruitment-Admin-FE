import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE_NAME } from 'src/app/environments/const';
import { AccountService } from '../../../services/app.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  attachedForm!: FormGroup;
  userName: any;
  password: any;
  visible = false;
  dismissible = false;
  errorMessage: any;
  
  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }
  
  ngOnInit() {
    this.logout();
  }

  logout() {
    localStorage.removeItem(LOCAL_STORAGE_NAME.ACCESS_TOKEN);
  }
  
  login() {
    if(this.userName == null ||  this.password == null) {
      this.showError("Please fill username and password")
    }else{
      var sendData = {
        Username : this.userName,
        Password : this.password
      };
      
      this.accountService.login(sendData).subscribe(data => {
        localStorage.setItem(LOCAL_STORAGE_NAME.ACCESS_TOKEN, data.Token);
        this.router.navigate([this.route.snapshot.queryParams['redirectUrl'] || 'dashboard'], { relativeTo: this.route });
      }, error => {
        console.log(error);
        this.showError(error.error);
      })
    }
  }

  showError(msg: string){
    this.errorMessage = msg;
    this.visible = true
    this.dismissible = true;
  }

}
