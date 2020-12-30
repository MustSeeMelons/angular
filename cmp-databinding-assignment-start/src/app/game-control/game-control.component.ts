import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";

@Component({
  selector: "app-game-control",
  templateUrl: "./game-control.component.html",
  styleUrls: ["./game-control.component.css"],
})
export class GameControlComponent implements OnDestroy {
  @Output() interval = new EventEmitter<{ num: number }>();

  counter = 0;
  intervalRef;

  ngOnDestroy(): void {
    clearInterval(this.intervalRef);
  }

  onStart = () => {
    this.intervalRef = setInterval(() => {
      this.interval.emit({ num: ++this.counter });
    }, 1000);
  };

  onPause = () => {
    clearInterval(this.intervalRef);
  };
}
