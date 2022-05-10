import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import moment from "moment-jalaali";

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.css']
})
export class PresentationsComponent implements OnInit {

  private httpClient: HttpClient;
  private router: Router;

  LoadPresentationRangeFields = new LoadPresentationRangeFields();
  PresentationsRange: Presentation[] = [];

  private token: string = "";

  constructor(client: HttpClient, router: Router) {
    this.httpClient = client;
    this.router = router;
  }

  ngOnInit(): void {
    switch (localStorage.getItem("_token") == null) {
      case true:
        this.router.navigate(["/login"]);
    }
    this.token = String(localStorage.getItem("_token"));
  }

  public defaultAuthHeaders() {
    return new HttpHeaders({
      "_token": this.token,
    });
  }

  public LoadPresentationRange() {
    this.httpClient.get<LoadPresentationRangeResponse>("https://localhost:5001/presentation/get-range/" + moment(this.LoadPresentationRangeFields.fromDate.value, "YYYY-MM-DD").valueOf() / 1000 + "/" + moment(this.LoadPresentationRangeFields.toDate.value, "YYYY-MM-DD").valueOf()/1000, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      this.PresentationsRange = response.presentations;
    });
  }

}

export class LoadPresentationRangeResponse {
  status_code = 1;
  presentations: Presentation[] = [];

}

class Presentation {
  Start: string = "";
  End: string = "";
}

export class LoadPresentationRangeFields {
  fromDate = new FormControl();
  toDate = new FormControl();
}
