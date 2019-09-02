import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private fb:FormBuilder,
    private http:HttpClient) { }
    readonly baseURI = 'https://localhost:5001/api';
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
}
