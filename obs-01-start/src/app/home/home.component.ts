import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private intervalSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    // this.intervalSubscription = interval(1000).subscribe((num) => {
    //   console.log(num);
    // });

    const customInterval = new Observable((observer) => {
      let counter = 0;
      setInterval(() => {
        observer.next(counter++);

        if (counter > 100) {
          observer.complete();
        }

        if (counter > 101) {
          observer.error(new Error("Couner > 3"));
        }
      }, 1000);
    });

    this.intervalSubscription = customInterval
      .pipe(
        filter((data: number) => {
          return data % 2 === 0;
        }),
        map((data: number) => {
          return `Round: ${data}`;
        })
      )
      .subscribe(
        (num) => {
          console.log(num);
        },
        (error) => {
          console.log(error);
          alert(error);
        },
        () => {
          alert("Counter Done.");
        }
      );
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }
}
