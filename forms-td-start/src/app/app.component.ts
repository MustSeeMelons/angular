import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @ViewChild("f") signupForm: NgForm;
  defaultQuestion = "pet";
  answer = "";
  genders = ["male", "female"];
  user = {
    username: "",
    email: "",
    secret: "",
    answer: "",
    gender: "",
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = "Superuser";

    // This is just horrible, full data needed
    // this.signupForm.setValue({ userData: { username: suggestedName }, secret: {} });

    this.signupForm.form.patchValue({ userData: { username: suggestedName } });
  }

  // onSubmit = (f: NgForm) => {
  //   console.log(f.value);
  // };

  onSubmit = () => {
    console.log(this.signupForm);
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secret = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
  };
}
