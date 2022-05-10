import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GetOffTimeResponse} from "./GetOffTimeResponse";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import moment from "moment-jalaali";
import {OffTime} from "../entities/OffTime";

@Component({
  selector: 'app-offtime',
  templateUrl: './offtime.component.html',
  styleUrls: ['./offtime.component.css']
})
export class OfftimeComponent implements OnInit {

  description: string = "";
  from_date = new FormControl();
  to_date = new FormControl();
  user_id: number = 4;

  change_status_off_time_id: number = 0;

  cancel_off_time_id: number = 0;

  edit_off_time_id: number = 0;
  edit_off_time_description: string = "";
  edit_off_time_to_date = new FormControl();
  edit_off_time_from_date = new FormControl();

  private httpClient: HttpClient;
  private router: Router;
  private token: string = "";

  public loadOffTimeRangeFields = new LoadOffTimeRangeFields();
  public offTmeRange: OffTime[] = [];

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
      from_date: moment(this.from_date.value, "YYYY-MM-DD").valueOf() / 1000,
      to_date: moment(this.to_date.value, "YYYY-MM-DD").valueOf() / 1000,
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
      this.edit_off_time_to_date.setValue(moment(response.OffTime.ToDate).format("YYYY-MM-DD"));
      this.edit_off_time_from_date.setValue(moment(response.OffTime.FromDate).format("YYYY-MM-DD"));
    });
  }

  EditOffTime() {
    this.httpClient.post("https://localhost:5001/off-times/edit-off-time", {
      off_time_id: this.edit_off_time_id,
      description: this.edit_off_time_description,
      from_date: moment(this.edit_off_time_from_date.value, "YYYY-MM-DD").valueOf() / 1000,
      to_date: moment(this.edit_off_time_to_date.value, "YYYY-MM-DD").valueOf() / 1000,
    }, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    })
  }

  LoadOffTimeRange() {
    this.httpClient.get<LoadOffTimeRangeResponse>("https://localhost:5001/off-times/get-range/" + moment(this.loadOffTimeRangeFields.fromDate.value, "YYYY-MM-DD").valueOf() / 1000 + "/" + moment(this.loadOffTimeRangeFields.toDate.value, "YYYY-MM-DD").valueOf() / 1000, {headers: this.defaultAuthHeaders()})
      .subscribe(response => {
        this.offTmeRange = response.off_times;
      });
  }
}

export class LoadOffTimeRangeResponse {
  public status_code: number = 1;
  public off_times: OffTime[] = [];
}

export class LoadOffTimeRangeFields {
  public fromDate: FormControl = new FormControl();
  public toDate: FormControl = new FormControl();
  public projectId = 0;
}
