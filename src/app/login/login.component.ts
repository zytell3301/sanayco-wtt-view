import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginResponse} from "./LoginResponse";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string = "";
  public password: string = "";

  private httpClient: HttpClient;
  private router: Router;

  constructor(httpClient: HttpClient, router: Router) {
    this.httpClient = httpClient;
    this.router = router;
  }

  ngOnInit(): void {
    switch (localStorage.getItem("_token") != null) {
      case true:
        this.router.navigate([""]);
    }
  }

  Login(): void {
    this.httpClient.post<LoginResponse>("https://localhost:5001/login", {
      username: this.username,
      password: this.password,
    }).subscribe(response => {
      switch (response.status_code != 0) {
        case true:
          console.log("An error occurred while attempting to login")
          break;
        default:
          localStorage.setItem("_token", response.token);
          this.router.navigate([""]);
      }
    });
  }

}
