import { Component } from "@angular/core";
import { UserService } from "../user.service";

@Component({
  selector: "app-inactive-users",
  templateUrl: "./inactive-users.component.html",
  styleUrls: ["./inactive-users.component.css"],
})
export class InactiveUsersComponent {
  users: string[];

  constructor(private userService: UserService) {}

  onSetToActive(id: number) {
    this.users = this.userService.inactiveUsers;
    this.userService.setToActive(id);
  }
}
