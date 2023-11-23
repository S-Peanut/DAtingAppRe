import { Component, Injector, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from '../_services/members.service';
import { UserParams } from '../_models/userParamas';
import { User } from '../_models/user.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public accountService: AccountService,
    private router: Router,
    private injector: Injector
  ) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe({
      next: (_) => {
        // const membersService = this.injector.get(MembersService);
        // this.accountService.currentUser$.pipe(take(1)).subscribe({
        //   next: (user) => {
        //     if (user) {
        //       membersService.userParams = new UserParams(user);
        //       membersService.user = user;
        //     }
        //   },
        // });

        this.router.navigateByUrl('/members');
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
