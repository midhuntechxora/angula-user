import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor( 
    public service: UserService,
    private toastr: ToastrService 
    ) { }

  ngOnInit() {
    this.service.formModel.reset(); 
  }
  onSubmit() {
    this.service.register().subscribe(
      (res:any)=>{
        if(res.succeeded) {
          this.service.formModel.reset();
          this.toastr.success('New User created!','Registartion successfull.');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case "DuplicateUserName": 
                this.toastr.error('User name  is already taken','Registration failed');               
                break;            
              default:
                  this.toastr.error(element.description,'Registration failed');     
                break;
            }
          });
        }
      },
      err=>{
        console.log(err);
        
      }
    );
  }

}
