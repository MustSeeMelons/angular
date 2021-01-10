import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  appForm: FormGroup;
  nameControl: FormControl;
  emailControl: FormControl;

  statuses = ["stable", "critical", "finished"];

  ngOnInit(): void {
    this.nameControl = new FormControl(null, {
      validators: [Validators.required, this.badNameSync],
      asyncValidators: [this.badNameAsync],
    });

    this.emailControl = new FormControl(null, {
      validators: [Validators.required, Validators.email],
    });

    this.appForm = new FormGroup({
      name: this.nameControl,
      email: this.emailControl,
      status: new FormControl(this.statuses[0]),
    });
  }

  badNameSync = (control: FormControl): ValidationErrors => {
    if (control.value === "Test") {
      return {
        badName: true,
      };
    }
    return null;
  };

  badNameAsync = (control): Promise<ValidationErrors | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (control.value === "Not") {
          resolve({
            badNameAsync: true,
          });
        }
      }, 1000);
    });
  };

  onSubmit = () => {
    console.log(this.appForm.value);
  };
}
