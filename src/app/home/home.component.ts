import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private service: UserService, public toastr:ToastrService) { }
  userDetail;
  ngOnInit() {
    this.service.getUserProfile().then(
      res=>{
        this.userDetail = this.service.userDetail;
      }
    );
    this.resetForm();
    
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    } else {
      this.service.userDetail = {
        UserName: '',
        Email: '',
        FullName: '',
        Role: ''
      }
    }
    
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['sign-in']);
  }
  onSubmit(form?:NgForm) {
   this.service.PutUserProfile().subscribe(
    (res:any)=>{
      this.toastr.success("Updated successfuly.","User");
      this.resetForm();
     },
     err=>{
       console.log(err);
     }
   );
  }
}
