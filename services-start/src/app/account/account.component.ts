import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AccountsService } from "../accounts.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"],
})
export class AccountComponent {
  @Input() account: { name: string; status: string };
  @Input() id: number;
  @Output() statusChanged = new EventEmitter<{
    id: number;
    newStatus: string;
  }>();

  constructor(private accountService: AccountsService) {}

  onSetTo(status: string) {
    this.accountService.updateStatus(this.id, status);
    this.accountService.statusUpdated.emit(status);
  }
}
