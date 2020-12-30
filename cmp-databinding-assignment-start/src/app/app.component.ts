import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  numbers: number[] = [];

  onNumberEmit = (event: { num: number }) => {
    this.numbers.push(event.num);
  };
}
