import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private router: Router;
  private httpClient: HttpClient;
  private token: string = "";

  public RecordOrderFields: RecordOrderFields = new RecordOrderFields();
  public CancelOrderFields: CancelOrderFields = new CancelOrderFields();

  constructor(router: Router, client: HttpClient) {
    this.router = router;
    this.httpClient = client;
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

  public RecordOrder() {
    this.httpClient.post("https://localhost:5001/foods/record-order", this.RecordOrderFields, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    });
  }

  public CancelOrder() {
    this.httpClient.post("https://localhost:5001/foods/cancel-order", this.CancelOrderFields, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    });
  }
}

export class RecordOrderFields {
  public food_id: number = 0;
}

export class CancelOrderFields {
  public order_id: number = 0;
}
