import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  styles: [
    `
      .fromFive {
        color: white;
      }
    `,
  ],
})
export class AppComponent {
  isVisible = true;
  clickHistory = [];
  counter = 0;

  onClick = () => {
    this.isVisible = !this.isVisible;
    this.clickHistory.push(++this.counter);
  };

  getBackground = (index: number) => {
    return index >= 4 ? "blue" : "inherit";
  };
}
