import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class AppComponent implements OnInit {
  title = 'wtt';
  private httpClient: HttpClient;
  private router: Router;
  private token: string = "";

  constructor(client: HttpClient, router: Router) {
    this.httpClient = client;
    this.router = router;
  }

  private defaultAuthHeaders() {
    return new HttpHeaders({"_token": this.token});
  }

  StorePresentation() {
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    this.httpClient.post("https://127.0.0.1:5001/presentation/record", {user_id: 4}, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
      console.log(response.valueOf());
    });
  }

  StorePresentationEnd() {
    this.httpClient.post("https://127.0.0.1:5001/presentation/record-end", {user_id: 4},{headers:this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    });
  }

  ngOnInit(): void {
    switch (localStorage.getItem("_token") == null) {
      case true:
        this.router.navigate(["/login"])
    }
    this.token = String(localStorage.getItem("_token"));
  }
}
