import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { DataService } from './Data.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private confirmationResult: firebase.auth.ConfirmationResult | undefined;

  constructor(private fireAuth: AngularFireAuth, private router: Router, private dataService: DataService) { }

  loginWithEmail(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem("token", "true");
      this.router.navigate(['homepageWithSignIn']);
    }, err => {
      console.log(err);
    });
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.fireAuth.signInWithPopup(provider).then((userCredential) => {
      localStorage.setItem("token", JSON.stringify(userCredential.user?.uid));
      // window.location.reload()
      const userId = userCredential.user?.uid
      if (userId) {
        this.checkExistUserId(userId).subscribe(exists => {
          if (exists) {
            console.log("Account exist");
            window.location.reload()
          } else {
            this.dataService.postAccount("", "", userId).subscribe( () => {
              window.location.reload()
            });
          }
        });
      } else {
        console.log("UserId is null");
      }
    }).catch((err) => {
      console.log("Login failed: ", err);
    });
  }

  checkExistUserId(userId: string): Observable<boolean> {
    return this.dataService.checkExistUserId(userId).pipe(
      map(data => {
        console.log(data);
        return data === "true";
      })
    );
  }

  signUpWithEmail(email: string, password: string) {
    const auth = this.fireAuth; // Use AngularFireAuth
    auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      if (userCredential.user != null) {
        this.sendConfirmationEmail(userCredential.user);
      }
    }).catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('This email is already in use.');
        localStorage.setItem("emailRegistered", "true");
        this.router.navigate(["signUp"]);
      } else {
        console.log('Error registering user:', error);
      }
    });
  }

  sendConfirmationEmail(user: firebase.User) {
    user.sendEmailVerification().then(() => {
      console.log("Verification email sent");
      this.router.navigate(["verifyEmail"]);
    }).catch((error) => {
      console.log('Error sending verification email:', error);
    });
  }

  async signUpWithPhoneNumber(phoneNumber: string, recaptchaVerifier: firebase.auth.RecaptchaVerifier): Promise<void> {
    this.confirmationResult = await this.fireAuth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
  }

  async verifyOTP(verificationCode: string): Promise<firebase.auth.UserCredential> {
    if (!this.confirmationResult) {
      throw new Error("No verification in progress.");
    }
    return this.confirmationResult.confirm(verificationCode);
  }
}
