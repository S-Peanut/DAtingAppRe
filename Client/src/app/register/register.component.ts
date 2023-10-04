import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegisterModel } from '../_models/register.model';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
     @Output() cancelRegister : EventEmitter<boolean> = new EventEmitter<boolean>;

     model: any = {};

     constructor(private accountService: AccountService) {
     }
     ngOnInit(): void {
     }

     register() {
          this.accountService.register(this.model).subscribe({
               next: () => {
                    this.cancel();
               },
               error: error => console.log(error)
          })
     }

     cancel() {
          this.cancelRegister.emit(false);
     }
}
