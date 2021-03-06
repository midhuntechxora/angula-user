import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userDetail:User; 
  constructor( private fb:FormBuilder,
    private http:HttpClient) { }
    readonly baseURI = 'http://localhost:5000/api';
  formModel = this.fb.group({
    UserName:['',Validators.required],
    FullName:[''],
    Email:['',Validators.email],
    Passwords:this.fb.group({
      Password:['',[Validators.required,Validators.minLength(4)]],
      ConfirmPassword:['',[Validators.required,Validators.minLength(4)]],
    }),
  });
  register() {
    var body = {
      UserName:this.formModel.value.UserName,
      FullName:this.formModel.value.FullName,
      Email:this.formModel.value.Email,
      Password:this.formModel.value.Passwords.Password,
    };
    return this.http.post(this.baseURI+'/applicationuser/register',body);
  }
  login(formData) {
    return this.http.post(this.baseURI+'/applicationuser/login',formData);
  }
  getUserProfile() {
    return this.http.get(this.baseURI+'/user').toPromise()
    .then(res => this.userDetail = res as User);
  }
  PutUserProfile() {
    return this.http.put(this.baseURI+'/user',this.userDetail);
  }
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
}
