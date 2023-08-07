import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  message: string = 'Vous etes deconnecté (pikachu/pikachu)';
  name: string;
  password: string;
  auth: AuthService

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth = this.authService;
  }

  setMessages() {
    if (this.authService.isLoggedIn) {
      this.message = "Vous etes connecté.";
    } else {
      this.message = "Identifiant ou mot de passe incorrect.";
    }
  }

  login() {
    this.message = "Tentative de connexion en cours...";
    this.authService.login(this.name, this.password).subscribe((isLoggedIn) => {
      this.setMessages();

      if (isLoggedIn) {
        this.router.navigate(["/pokemons"]);
      } else {
        this.password = "";
        this.router.navigate(["/login"]);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.message = 'Vous etes deconnecté.';
  }
}
