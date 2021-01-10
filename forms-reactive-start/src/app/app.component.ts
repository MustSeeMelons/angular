import { Component, OnInit } from "@angular/core";
import {
  FormArray,
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
  genders = ["male", "female"];
  signupForm: FormGroup;

  forbiddenUsernames = ["Penis", "Sinep"];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, {
          validators: [Validators.required, this.forbiddenNames],
        }),
        email: new FormControl(null, {
          validators: [Validators.required, Validators.email],
          asyncValidators: this.forbiddenEmails,
        }),
      }),
      gender: new FormControl(this.genders[0]),
      hobbies: new FormArray([]),
    });

    this.signupForm.valueChanges.subscribe((val) => {
      console.log(val);
    });

    this.signupForm.statusChanges.subscribe((val) => {
      console.log(val);
    });

    // this.signupForm.setValue({
    //   userData: {
    //     username: "Kaka",
    //     email: "kaka@suds.ka",
    //   },
    //   gender: "potato",
    //   hobbies: [],
    // });

    this.signupForm.patchValue({ userData: { username: "Pops" } });
  }

  onSubmit = () => {
    this.signupForm.reset();
  };

  onAddHobby = () => {
    const control = new FormControl(null, Validators.required);
    (this.signupForm.get("hobbies") as FormArray).push(control);
  };

  forbiddenNames = (control: FormControl): ValidationErrors => {
    if (this.forbiddenUsernames.indexOf(control.value) >= 0) {
      return {
        nameIsForbidden: true,
      };
    } else {
      return null;
    }
  };

  forbiddenEmails = (control: FormControl): Promise<any> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({
            emailIsForbidden: true,
          });
        }
        resolve(null);
      }, 2000);
    });
  };
}
