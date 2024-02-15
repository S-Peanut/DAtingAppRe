import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observer } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined;
  public onlineUsers: string[] = [];

  constructor(
    private memberService: MembersService,
    private toastr: ToastrService,
    public presenceService: PresenceService
  ) {
    this.presenceService.onlineUsers$.subscribe({
      next: (onlineUsers) => {
        this.onlineUsers = onlineUsers;
      },
    });
  }

  ngOnInit(): void {}

  addLike(member: Member) {
    this.memberService.addLike(member.userName).subscribe({
      next: () => this.toastr.success('You have liked' + member.knownAs),
    });
  }

  checkActive() {
    if (
      this.member &&
      this.onlineUsers &&
      Array.from(this.onlineUsers).includes(this.member.userName)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
