import { Component } from "@angular/core";
import { UserService } from "../user.service";

@Component({
  selector: "app-active-users",
  templateUrl: "./active-users.component.html",
  styleUrls: ["./active-users.component.css"],
})
export class ActiveUsersComponent {
  users: string[];

  constructor(private userService: UserService) {}

  onSetToInactive(id: number) {
    this.users = this.userService.activeUsers;
    this.userService.setToInactive(id);
  }
}
