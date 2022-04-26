import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoadUserResponse, User} from "./LoadUserResponse";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public name: string = "";
  public lastname: string = "";
  public skill_level: string = "";
  public company_level: string = "";
  public password: string = "";
  public username: string = "";
  private permissions: string[] = [];

  public delete_user_username: string = "";

  public edit_user_name: string = "";
  public edit_user_lastname: string = "";
  public edit_user_skill_level: string = "";
  public edit_user_company_level: string = "";
  public edit_user_username: string = "";
  private edit_user_permissions: string[] = [];
  public edit_user_user_id: number = 0
  public load_user_username: string = "";

  public edit_user_init_perms: Permissions = new Permissions();

  private httpClient: HttpClient;
  private router: Router;
  private token: string = "";

  constructor(httpClient: HttpClient, router: Router) {
    this.httpClient = httpClient;
    this.router = router;
  }

  ngOnInit(): void {
    switch (localStorage.getItem("_token") == null) {
      case true:
        this.router.navigate(["/login"]);
    }
    this.token = String(localStorage.getItem("_token"));
  }

  private defaultAuthHeaders() {
    return new HttpHeaders({"_token": this.token});
  }

  public TogglePermission(permission: string) {
    let index = this.permissions.indexOf(permission);
    switch (index == -1) {
      case true:
        this.permissions.push(permission);
        break;
      default:
        this.permissions.splice(index, 1);
    }
  }

  public edit_TogglePermission(permission: string) {
    let index = this.edit_user_permissions.indexOf(permission);
    switch (index == -1) {
      case true:
        this.edit_user_permissions.push(permission);
        break;
      default:
        this.edit_user_permissions.splice(index, 1);
    }
  }


  public CreateUser() {
    this.httpClient.post("https://localhost:5001/record-user", {
      name: this.name,
      lastname: this.lastname,
      skill_level: this.skill_level,
      company_level: this.company_level,
      password: this.password,
      username: this.username,
      permissions: this.permissions,
    }, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    });
  }

  public DeleteUser() {
    this.httpClient.post("https://localhost:5001/delete-user", {
      username: this.delete_user_username,
    }, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    })
  }

  public LoadUser() {
    this.httpClient.get<LoadUserResponse>("https://localhost:5001/get-user/" + this.load_user_username, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      switch (response.status_code != 0) {
        case true:
          console.log("operation failed");
          return;
      }
      this.edit_user_username = response.user.username;
      this.edit_user_user_id = response.user.id;
      this.edit_user_company_level = response.user.company_level;
      this.edit_user_lastname = response.user.lastname;
      this.edit_user_name = response.user.name;
      this.edit_user_skill_level = response.user.skill_level;
      response.permissions.forEach((value) => {
        console.log(value.title)
        this.ActivatePermission(value.title);
      })
    });
  }

  private ActivatePermission(title: string) {
    switch (title) {
      case "register-user":
        this.edit_user_init_perms.create_user = true;
        break;
      case "delete-user":
        this.edit_user_init_perms.delete_user = true;
        break;
      case "create-project":
        this.edit_user_init_perms.create_project = true;
        break;
      case "edit-project":
        this.edit_user_init_perms.edit_project = true;
        break;
      case "record-off-time":
        this.edit_user_init_perms.record_off_time = true;
        break;
      case "change-off-time-status":
        this.edit_user_init_perms.change_off_time_status = true;
        break;
      case "edit-user":
        this.edit_user_init_perms.edit_user = true;
        break;
      default:
        return;
    }
    this.edit_TogglePermission(title);
  }

  public UpdateUser() {
    this.httpClient.post("https://localhost:5001/update-user", {
      user_id: this.edit_user_user_id,
      username: this.edit_user_username,
      name: this.edit_user_name,
      lastname: this.edit_user_lastname,
      skill_level: this.edit_user_skill_level,
      company_level: this.edit_user_company_level,
      permissions: this.edit_user_permissions,
    }, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    })
  }
}

export class Permissions {
  public create_user: boolean = false;
  public delete_user: boolean = false;
  public create_project: boolean = false;
  public edit_project: boolean = false;
  public record_off_time: boolean = false;
  public change_off_time_status: boolean = false;
  public edit_user: boolean = false;
}
