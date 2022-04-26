import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GetOffTimeResponse} from "./GetOffTimeResponse";
import {Router} from "@angular/router";
import {Token} from "@angular/compiler";

@Component({
  selector: 'app-offtime',
  templateUrl: './offtime.component.html',
  styleUrls: ['./offtime.component.css']
})
export class OfftimeComponent implements OnInit {

  description: string = "";
  from_date: number = 0;
  to_date: number = 0;
  user_id: number = 4;

  change_status_off_time_id: number = 0;

  cancel_off_time_id: number = 0;

  edit_off_time_id: number = 0;
  edit_off_time_description: string = "";
  edit_off_time_to_date: number = 0;
  edit_off_time_from_date: number = 0;

  private httpClient: HttpClient;
  private router: Router;
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
    this.token = String(localStorage.getItem("_token"))
  }

  private defaultAuthHeaders() {
    return new HttpHeaders({"_token": this.token})
  }

  RecordOffTime() {
    this.httpClient.post("https://localhost:5001/off-times/record-off-time", {
      description: this.description,
      from_date: this.from_date,
      to_date: this.to_date,
      user_id: this.user_id,
    }, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    });
  }

  ApproveOffTime() {
    this.httpClient.post("https://localhost:5001/off-times/approve-off-time", {
      off_time_id: this.change_status_off_time_id,
    }, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    })
  }

  RejectOffTime() {
    this.httpClient.post("https://localhost:5001/off-times/reject-off-time", {
      off_time_id: this.change_status_off_time_id,
    }, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response)
    })
  }

  SetOffTimeStatusWaiting() {
    this.httpClient.post("https://localhost:5001/off-times/set-off-time-waiting", {
      off_time_id: this.change_status_off_time_id,
    }, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    });
  }

  CancelOffTime() {
    this.httpClient.post("https://localhost:5001/off-times/cancel-off-time", {
      off_time_id: this.cancel_off_time_id,
    }, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response)
    });
  }

  LoadOffTimeData() {
    this.httpClient.get<GetOffTimeResponse>("https://localhost:5001/off-times/get-off-time/" + this.edit_off_time_id).subscribe(response => {
      this.edit_off_time_description = response.OffTime.Description;
      this.edit_off_time_to_date = Date.parse(response.OffTime.ToDate).valueOf();
      this.edit_off_time_from_date = Date.parse(response.OffTime.FromDate).valueOf();
    });
  }

  EditOffTime() {
    this.httpClient.post("https://localhost:5001/off-times/edit-off-time", {
      off_time_id: this.edit_off_time_id,
      description: this.edit_off_time_description,
      from_date: this.edit_off_time_from_date,
      to_date: this.edit_off_time_to_date,
    }).subscribe(response => {
      console.log(response);
    })
  }
}
