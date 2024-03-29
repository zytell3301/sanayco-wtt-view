import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GetTaskResponse} from "./GetTaskResponse";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import moment from "moment-jalaali";
import {Task} from "../entities/Task";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  description: string = "";
  project_id: number = 0;
  title: string = "";
  task_point: number = 0;
  work_location: string = "";
  task_id: number = 0;
  start_time = new FormControl();

  edit_description: string = "";
  edit_project_id: number = 0;
  edit_title: string = "";
  edit_work_location: string = "";
  edit_task_id: number = 0;
  edit_task_start_time = new FormControl();
  edit_task_points = 0;

  edit_status_task_id: number = 0;

  private httpClient: HttpClient;
  private router: Router;
  private token: string = "";

  public taskRange: Task[] = [];
  public GetTaskRangeFields: GetTaskRangeFields = new GetTaskRangeFields();

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
    return new HttpHeaders({"_token": this.token});
  }

  submit() {
    this.httpClient.post("https://localhost:5001/tasks/submit-task", {
      description: this.description,
      project_id: this.project_id,
      title: this.title,
      work_location: this.work_location,
      start_time: moment(this.start_time.value, "YYYY-MM-DD").valueOf(),
      points: this.task_point,
    }, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    });
  }

  SubmitDeleteTask() {
    this.httpClient.post("https://localhost:5001/tasks/delete-task", {
      task_id: this.task_id,
    }, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    });
  }

  GetTask() {
    this.httpClient.get<GetTaskResponse>("https://localhost:5001/tasks/get-task/" + this.edit_task_id, {headers: this.defaultAuthHeaders()}).subscribe((task) => {
      console.log(task);
      switch (task.status_code == 0) {
        case true:
          this.edit_task_id = task.Task.Id;
          this.edit_description = task.Task.Description;
          this.edit_title = task.Task.Title;
          this.edit_work_location = task.Task.WorkLocation;
          this.edit_project_id = task.Task.ProjectId;
          this.edit_task_start_time.setValue(moment(task.Task.StartTime).format("YYYY-MM-DD"));
          this.edit_task_points = task.Task.Points;
          break;
        default:
          this.edit_task_id = 0;
          this.edit_description = "";
          this.edit_title = "";
          this.edit_work_location = "";
          this.edit_project_id = 0;
      }
    });
  }

  EditTask() {
    this.httpClient.post("https://localhost:5001/tasks/edit-task", {
      task_id: this.edit_task_id,
      description: this.edit_description,
      start_time: moment(this.edit_task_start_time.value, "YYYY-MM-DD").valueOf(),
      points: this.edit_task_points,
      title: this.edit_title,
      work_location: this.edit_work_location,
    }, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    });
  }

  ApproveTask() {
    this.httpClient.post("https://localhost:5001/tasks/approve-task", {
      task_id: this.edit_status_task_id,
    }, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    })
  }

  RejectTask() {
    this.httpClient.post("https://localhost:5001/tasks/reject-task", {
      task_id: this.edit_status_task_id,
    }, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    });
  }

  SetTaskWaiting() {
    this.httpClient.post("https://localhost:5001/tasks/set-task-waiting", {
      task_id: this.edit_status_task_id,
    }, {headers: this.defaultAuthHeaders()}).subscribe(response => {
      console.log(response);
    });
  }

  GetTaskRange() {
    this.httpClient
      .get<GetTaskRangeResponse>("https://localhost:5001/tasks/get-range/" + moment(this.GetTaskRangeFields.fromDate.value, "YYYY-MM-DD").valueOf() / 1000 + "/" + moment(this.GetTaskRangeFields.toDate.value, "YYYY-MM-DD").valueOf() / 1000 + "/" + this.GetTaskRangeFields.projectId + "/" + this.GetTaskRangeFields.workLocation, {headers: this.defaultAuthHeaders()})
      .subscribe(response => {
        switch (response.status_code != 0) {
          case true:
            return;
        }
        this.taskRange = response.tasks;
      });
  }
}

export class GetTaskRangeResponse {
  public status_code: number = 1;
  public tasks: Task[] = [];
}

export class GetTaskRangeFields {
  public fromDate: FormControl = new FormControl();
  public toDate: FormControl = new FormControl();
  public projectId: number = 0;
  public workLocation: string = "";
}
