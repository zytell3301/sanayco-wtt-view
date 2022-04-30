import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
  private httpClient: HttpClient;
  private router: Router;
  private token: string = "";

  public SubmitMissionFields: SubmitMissionFields = new SubmitMissionFields();
  public DeleteMissionFields: DeleteMissionFields = new DeleteMissionFields();
  public GetMissionFields: GetMissionFields = new GetMissionFields();
  public EditMissionFields: EditMissionFields = new EditMissionFields();
  public ChangeMissionStatusFields: ChangeMissionStatusFields = new ChangeMissionStatusFields();

  constructor(router: Router, httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.router = router;
  }

  private getToken() {
    return String(localStorage.getItem("_token"));
  }

  ngOnInit(): void {
    let token = this.getToken();
    switch (token == null) {
      case true:
        this.router.navigate(["/login"]);
    }
    this.token = token;
  }

  private defaultAuthHeaders() {
    return new HttpHeaders({"_token": this.token});
  }

  public submitMission() {
    this.httpClient.post("https://localhost:5001/missions/record-mission", {
      description: this.SubmitMissionFields.description,
      title: this.SubmitMissionFields.title,
      location: this.SubmitMissionFields.location,
      from_date: this.SubmitMissionFields.from_date,
      to_date: this.SubmitMissionFields.to_date,
      project_id: this.SubmitMissionFields.project_id,
    }, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    });
  }

  public DeleteMission() {
    this.httpClient.post("https://localhost:5001/missions/delete-mission", {
      mission_id: this.DeleteMissionFields.mission_id,
    }).subscribe(response => {
      console.log(response);
    });
  }

  public GetMission() {
    this.httpClient.get<GetMissionResponse>("https://localhost:5001/missions/get-mission/" + this.GetMissionFields.mission_id, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      this.EditMissionFields.mission_id = response.mission.id;
      this.EditMissionFields.to_date = Date.parse(response.mission.to_date).valueOf();
      this.EditMissionFields.title = response.mission.title;
      this.EditMissionFields.project_id = response.mission.project_id;
      this.EditMissionFields.description = response.mission.description;
      this.EditMissionFields.location = response.mission.location;
      this.EditMissionFields.from_date = Date.parse(response.mission.from_date).valueOf();

    })
  }

  public UpdateMission() {
    this.httpClient.post("https://localhost:5001/missions/update-mission", {
      mission_id: this.EditMissionFields.mission_id,
      title: this.EditMissionFields.title,
      description: this.EditMissionFields.description,
      from_date: this.EditMissionFields.from_date,
      to_date: this.EditMissionFields.to_date,
      project_id: this.EditMissionFields.project_id,
      location: this.EditMissionFields.location,
    }, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    })
  }

  public SetMissionApproved() {
    this.httpClient.post("https://localhost:5001/missions/approve", {
      mission_id: this.ChangeMissionStatusFields.mission_id,
    }, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    })
  }
}

class SubmitMissionFields {
  public title: string = "";
  public description: string = "";
  public from_date: number = 0;
  public to_date: number = 0;
  public project_id: number = 0;
  public location: string = "";
}

class EditMissionFields {
  public mission_id: number = 0;
  public title: string = "";
  public description: string = "";
  public from_date: number = 0;
  public to_date: number = 0;
  public project_id: number = 0;
  public location: string = "";
  public is_verified: boolean = false;
}

class DeleteMissionFields {
  public mission_id: number = 0;
}

class GetMissionFields {
  public mission_id: number = 0;
}

class GetMissionResponse {
  public status_code: number = 0;
  public mission: Mission = new Mission();
}

class Mission {
  public description: string = "";
  public from_date: string = "";
  public id: number = 0;
  public location: string = "";
  public member_id: number = 0;
  public project_id: number = 0;
  public title: string = "";
  public to_date: string = "";
}

class ChangeMissionStatusFields {
  public mission_id: number = 0;
}
