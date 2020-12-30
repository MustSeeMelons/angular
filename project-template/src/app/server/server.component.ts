import { Component } from "@angular/core";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
})
export class ServerComponent {
  rand = (Math.random() * 100).toFixed(0);

  id = 1;
  status = "offline";
  getName = () => {
    return `Server: ${this.rand}`;
  };
}
