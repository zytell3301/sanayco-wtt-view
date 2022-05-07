import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoadUserResponse} from "./LoadUserResponse";

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
  public profile_picture!: File;
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

  public Permissions: Permission[] = [
    new Permission('create-project', 'create_project'),
    new Permission('edit-project', 'edit_project'),
    new Permission('delete-project', 'delete_project'),
    new Permission('add-project-member', 'add_project_member'),
    new Permission('delete-project-member', 'delete_project_member'),
    new Permission('edit-project-member', 'edit_project_member'),
    new Permission('create-user', 'create_user'),
    new Permission('edit-user', 'edit_user'),
    new Permission('delete-user', 'delete_user'),
    new Permission('record-off-time', 'record_off_time'),
    new Permission('change-off-time-status', 'change_off_time_status'),
    new Permission('cancel-off-time', 'cancel_off_time'),
    new Permission('edit-off-time', 'edit_off_time'),
    new Permission('record-mission', 'record_mission'),
    new Permission('delete-mission', 'delete_mission'),
    new Permission('edit-mission', 'edit_mission'),
    new Permission('change-mission-status', 'change_mission_status'),
    new Permission('create-food', 'create_food'),
    new Permission('update-food-info', 'update_food_info'),
    new Permission('delete-food', 'delete_food'),
    new Permission('order-food', 'order_food'),
    new Permission('cancel-food-order', 'cancel_food_order'),
    new Permission('create-task', 'create_task'),
    new Permission('edit-task', 'edit_task'),
  ];

  private httpClient: HttpClient;
  private router: Router;
  private token: string = "";

  constructor(httpClient: HttpClient, router: Router) {
    this.httpClient = httpClient;
    this.router = router;
  }

  public SetFile($event: any) {
    this.profile_picture = $event.target.files[0];
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

  private refreshPermissions() {
    this.Permissions.forEach(value => {
      value.is_active = false;
    });
    this.edit_user_permissions = [];
  }

  public CreateUser() {
    let formData = new FormData();
    formData.append("data", JSON.stringify({
      name: this.name,
      lastname: this.lastname,
      skill_level: this.skill_level,
      company_level: this.company_level,
      password: this.password,
      username: this.username,
      permissions: this.permissions,
    }));
    formData.append("profile_picture", this.profile_picture);
    this.httpClient.post("https://localhost:5001/record-user", formData, {headers: this.defaultAuthHeaders()}).subscribe(response => {
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
      this.refreshPermissions();
      response.permissions.forEach((value) => {
        this.ActivatePermission(value.title);
      })
    });
  }

  private ActivatePermission(title: string) {
    this.Permissions.forEach((value => {
      switch (title == value.title) {
        case true:
          this.edit_TogglePermission(title);
          value.is_active = true;
      }
    }))
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

export class Permission {
  public title: string;
  public model: string;
  public is_active: boolean = false;

  public constructor(title: string, model: string) {
    this.title = title;
    this.model = model;
  }
}
