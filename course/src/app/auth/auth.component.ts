import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthRespnse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnDestroy(): void {
    this.closeSub && this.closeSub.unsubscribe();
  }

  onSwitchMode = () => {
    this.isLoginMode = !this.isLoginMode;
  };

  onSubmit = (form: NgForm) => {
    if (form.invalid) {
      return false;
    }

    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    this.error = null;

    let authObs: Observable<AuthRespnse>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      (response) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (err) => {
        this.isLoading = false;
        this.error = err;
        this.showErrorAlert(err);
      }
    );
    form.reset();
  };

  private showErrorAlert = (message: string) => {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    const hostViewContainerRef = this.alertHost.viewContainer;

    hostViewContainerRef.clear();

    const compRef = hostViewContainerRef.createComponent(factory);

    compRef.instance.message = message;
    this.closeSub = compRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  };

  onHandleError = () => {
    this.error = null;
  };
}
