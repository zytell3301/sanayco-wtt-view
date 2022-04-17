import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class AppComponent {
  title = 'wtt';
  private httpClient: HttpClient;

  constructor(client: HttpClient) {
    this.httpClient = client;
  }

  StorePresentation() {
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    this.httpClient.post("https://127.0.0.1:5001/presentation/record", {user_id: 4}).subscribe(response => {
      console.log(response);
      console.log(response.valueOf());
    });
  }

  StorePresentationEnd() {
    this.httpClient.post("https://127.0.0.1:5001/presentation/record-end", {user_id: 4}).subscribe(response => {
      console.log(response);
    });
  }
}
