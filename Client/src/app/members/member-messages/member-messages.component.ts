import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';
import { Message } from 'src/app/_models/message';
import { MessagesService } from 'src/app/_services/messages.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-member-messages',
  standalone: true,
  templateUrl: './member-messages.component.html',
  imports: [CommonModule, TimeagoModule, FormsModule],
  styleUrls: ['./member-messages.component.scss'],
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm;
  @Input() username?: string;
  messageContent = '';
  loading = false;
 
  constructor(public messageService: MessagesService) {}
  ngOnInit(): void {}

  sendMessage() {
    if (!this.username) return;
    this.loading = true;
    this.messageService
      .sendMessage(this.username, this.messageContent)
      .then(() => {
        this.messageForm?.reset();
      }).finally(() => this.loading = false);
  }

  timeAgoFormatter(timeagoDate: string) {
    if (timeagoDate.search('seconds') !== -1) {
      return 'Few seconds ago';
    } else {
      return timeagoDate;
    }
  }
}
