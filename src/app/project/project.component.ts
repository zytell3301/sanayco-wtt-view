import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GetProjectResponse} from "./GetProjectResponse";
import {Router} from "@angular/router";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  name: string = "";
  description: string = "";

  edit_project_id: number = 0;
  edit_project_name: string = "";
  edit_project_description: string = "";

  delete_project_id: number = 0;

  add_member_project_id: undefined = undefined;
  add_member_user_id: undefined = undefined;
  add_member_level: string = "";

  delete_member_project_id: undefined = undefined;
  delete_member_user_id: undefined = undefined;

  update_project_member_user_id: undefined = undefined;
  update_project_member_project_id: undefined = undefined;
  update_project_member_level: undefined = undefined;

  private creator: number = 4;

  private httpClient: HttpClient;
  private router: Router;

  constructor(client: HttpClient, router: Router) {
    this.httpClient = client;
    this.router = router;
  }

  ngOnInit(): void {
    switch (localStorage.getItem("_token") == null) {
      case true:
        this.router.navigate(["login"]);
    }
  }

  RecordProject() {
    this.httpClient.post("https://localhost:5001/projects/record-project", {
      description: this.description,
      name: this.name,
      creator_id: 4,
    }).subscribe(response => {
      console.log(response);
    })
  }

  LoadProject() {
    this.httpClient.get<GetProjectResponse>("https://localhost:5001/projects/get-project/" + this.edit_project_id).subscribe(response => {
      switch (response.StatusCode == 0) {
        case true:
          this.edit_project_name = response.Project.Name;
          this.edit_project_description = response.Project.Description;
          break;
        default:
          console.log("Something wrong. Status code: " + response.StatusCode)
      }
    })
  }

  UpdateProject() {
    this.httpClient.post("https://localhost:5001/projects/edit-project", {
      project_id: this.edit_project_id,
      name: this.edit_project_name,
      description: this.edit_project_description,
    }).subscribe(response => {
      console.log(response);
    });
  }

  DeleteProject() {
    this.httpClient.post("https://localhost:5001/projects/delete-project", {
      project_id: this.delete_project_id,
    }).subscribe(response => {
      console.log(response);
    })
  }

  AddMember() {
    this.httpClient.post("https://localhost:5001/projects/add-member", {
      project_id: this.add_member_project_id,
      user_id: this.add_member_user_id,
      level: this.add_member_level,
    }).subscribe(response => {
      console.log(response)
    })
  }

  DeleteMember() {
    console.log(this.delete_member_project_id);
    this.httpClient.post("https://localhost:5001/projects/remove-member", {
      project_id: this.delete_member_project_id,
      user_id: this.delete_member_user_id,
    }).subscribe(response => {
      console.log(response);
    })
  }

  UpdateProjectMember() {
    this.httpClient.post("https://localhost:5001/projects/edit-member", {
      project_id: this.update_project_member_project_id,
      user_id: this.update_project_member_user_id,
      level: this.update_project_member_level,
    }).subscribe(response => {
      console.log(response)
    })
  }
}
