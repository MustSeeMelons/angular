import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuth = false;

  constructor(
    private storageService: DataStorageService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuth = !!user;
    });
  }

  onSaveData = () => {
    this.storageService.storeRecipes();
  };

  onFetchData = () => {
    this.storageService.fetchRecipes().subscribe();
  };

  onLogout = () => {
    this.authService.logout();
    this.router.navigate(['/auth']);
  };
}
