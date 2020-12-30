import { Component } from "@angular/core";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styles: [
    `
      .online {
        color: white;
      }
    `,
  ],
})
export class ServerComponent {
  id = 1;
  status = "offline";

  constructor() {
    this.status = Math.random() > 0.5 ? "Online" : "Offline";
  }

  getName = () => {
    return this.status;
  };

  getColor = () => {
    return this.status === "Online" ? "green" : "red";
  };
}
