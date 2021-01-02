import { Injectable } from "@angular/core";

@Injectable()
export class CounterService {
  private switchedToActive: number = 0;
  private switchedToInactive: number = 0;

  private log = () => {
    console.log(
      `To Active: ${this.switchedToActive} To Inactive: ${this.switchedToInactive}`
    );
  };

  toActive = () => {
    this.switchedToActive++;
    this.log();
  };

  toInactive = () => {
    this.switchedToInactive++;
    this.log();
  };
}
