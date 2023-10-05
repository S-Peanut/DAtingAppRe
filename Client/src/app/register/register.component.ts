import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RegisterModel } from '../_models/register.model';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
     @Output() cancelRegister : EventEmitter<boolean> = new EventEmitter<boolean>;

     model: any = {};

     constructor(private accountService: AccountService, private toastr: ToastrService) {
     }
     ngOnInit(): void {
     }

     register() {
          this.accountService.register(this.model).subscribe({
               next: () => {
                    this.cancel();
               },
               error: error => {
                    this.toastr.error(error.error.errors)
               }
          })
     }

     cancel() {
          this.cancelRegister.emit(false);
     }
}
