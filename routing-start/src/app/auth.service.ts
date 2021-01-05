export class AuthService {
  loggedIn = false;

  logIn = () => {
    this.loggedIn = true;
  };

  logout = () => {
    this.loggedIn = false;
  };

  isAuthenticated = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
  };
}
