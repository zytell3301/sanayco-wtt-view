import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {

  private router: Router;
  private httpClient: HttpClient;
  private token: string = "";

  public CreateFoodFields: CreateFoodFields = new CreateFoodFields();
  public DeleteFoodFields: DeleteFoodFields = new DeleteFoodFields();
  public EditFoodFields: EditFoodFields = new EditFoodFields();
  public ChangeFoodStatusFields: ChangeFoodStatusFields = new ChangeFoodStatusFields();

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

  private defaultAuthHeaders() {
    return new HttpHeaders({
      "_token": this.token,
    });
  }

  public CreateNewFood() {
    this.httpClient.post("https://localhost:5001/foods/create-food", this.CreateFoodFields, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    });
  }

  public DeleteFood() {
    this.httpClient.post("https://localhost:5001/foods/delete-food", this.DeleteFoodFields, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response)
    });
  }

  public GetFoodInfo() {
    this.httpClient.get<GetFoodInfoResponse>("https://localhost:5001/foods/get-food-info/" + this.EditFoodFields.food_id, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      switch (response.status_code != 0) {
        case true:
          console.log("internal error");
      }
      this.EditFoodFields.food_id = response.food.id;
      this.EditFoodFields.price = response.food.price;
      this.EditFoodFields.title = response.food.title;
    });
  }

  public UpdateFoodInfo() {
    this.httpClient.post("https://localhost:5001/foods/update-food-info", this.EditFoodFields, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    });
  }

  public SetFoodAvailable() {
    this.httpClient.post("https://localhost:5001/foods/set-food-available", this.ChangeFoodStatusFields, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    });
  }

  public SetFoodUnavailable() {
    this.httpClient.post("https://localhost:5001/foods/set-food-unavailable", this.ChangeFoodStatusFields, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    });
  }
}

export class CreateFoodFields {
  public title: string = "";
  public price: number = 0;
  public is_available: boolean = false;
}

export class DeleteFoodFields {
  public food_id: number = 0;
}

export class EditFoodFields {
  public food_id: number = 0;
  public title: string = "";
  public price: number = 0;
}

class GetFoodInfoResponse {
  public status_code: number = 1;
  public food: Food = new Food();
}

class Food {
  public id: number = 0;
  public title: string = "";
  public is_available: boolean = false;
  public price: number = 0;
}

export class ChangeFoodStatusFields {
  public food_id: number = 0;
}
