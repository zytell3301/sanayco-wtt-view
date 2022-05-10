import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormControl} from "@angular/forms";
import moment from "moment-jalaali";

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

  public FoodsList: Food[] = [];

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
    this.GetFoodsList();
  }

  public defaultAuthHeaders() {
    return new HttpHeaders({
      "_token": this.token,
    });
  }

  public RecordOrder(foodId: number) {
    this.httpClient.post("https://localhost:5001/foods/record-order", {
      food_id: foodId,
      date: moment(this.RecordOrderFields.date.value,'YYYY-MM-DD').valueOf()/1000,
    }, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    });
  }

  public CancelOrder() {
    this.httpClient.post("https://localhost:5001/foods/cancel-order", this.CancelOrderFields, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    });
  }

  public GetFoodsList() {
    this.httpClient.get<GetAvailableFoodsListResponse>("https://localhost:5001/foods/get-available-foods-list", {headers: this.defaultAuthHeaders()}).subscribe(response => {
      switch (response.status_code != 0) {
        case true:
          console.log("internal error. Code: " + response.status_code);
          return;
      }
      return this.FoodsList = response.foods;
    });
  }
}

class GetAvailableFoodsListResponse {
  public foods: Food[] = [];
  public status_code: number = 1;
}

export class Food {
  public id: number = 0;
  public title: string = "";
  public price: number = 0;
}

export class RecordOrderFields {
  public food_id: number = 0;
  public date: FormControl = new FormControl();
}

export class CancelOrderFields {
  public order_id: number = 0;
}
