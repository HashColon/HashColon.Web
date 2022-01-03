import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GithubAuthProvider, signOut } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  onAuthStateChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private auth: Auth
  ) {
    auth.onAuthStateChanged(user => {
      this.onAuthStateChanged.next(!!user);
    })
  }

  async DoAdminSignIn() {
    console.log('Sign In');
    return await signInWithPopup(this.auth, new GithubAuthProvider());
  }

  async DoAdminSignOut() {
    console.log('Sign Out');
    return await signOut(this.auth);
  }

  IsAdminAuth() {
    return !!this.auth.currentUser;
  }
}
