import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Task} from "../entities/Task";
import {GetTaskResponse} from "./GetTaskResponse";
import {AppComponent} from "../app.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  description: string = "";
  project_id: number = 0;
  title: string = "";
  end_time: number = 0;
  work_location: string = "";
  task_id: number = 0;

  edit_description: string = "";
  edit_project_id: number = 0;
  edit_title: string = "";
  edit_end_time: number = 0;
  edit_work_location: string = "";
  edit_task_id: number = 0;

  edit_status_task_id: number = 0;

  private httpClient: HttpClient;
  private router: Router;

  constructor(client: HttpClient, router: Router) {
    this.httpClient = client;
    this.router = router;
  }

  ngOnInit(): void {
    switch (localStorage.getItem("_token") == null) {
      case true:
        this.router.navigate(["/login"]);
    }
  }

  submit() {
    this.httpClient.post("https://localhost:5001/tasks/submit-task", {
      user_id: 4,
      description: this.description,
      project_id: this.project_id,
      title: this.title,
      end_time: this.end_time,
      work_location: this.work_location,
    }).subscribe(response => {
      console.log(response);
    });
  }

  SubmitDeleteTask() {
    this.httpClient.post("https://localhost:5001/tasks/delete-task", {
      task_id: this.task_id,
    }).subscribe(response => {
      console.log(response);
    });
  }

  GetTask() {
    this.httpClient.get<GetTaskResponse>("https://localhost:5001/tasks/get-task/" + this.edit_task_id).subscribe((task) => {
      console.log(task);
      switch (task.Code == 0) {
        case true:
          this.edit_task_id = task.Task.Id;
          this.edit_description = task.Task.Description;
          this.edit_title = task.Task.Title;
          this.edit_work_location = task.Task.WorkLocation;
          this.edit_project_id = task.Task.ProjectId;
          this.edit_end_time = Date.parse(task.Task.EndTime) - Date.parse("1970-01-1 00:00:00");
          break;
        default:
          this.edit_task_id = 0;
          this.edit_description = "";
          this.edit_title = "";
          this.edit_work_location = "";
          this.edit_project_id = 0;
          this.edit_end_time = 0;
      }
    });
  }

  EditTask() {
    this.httpClient.post("https://localhost:5001/tasks/edit-task", {
      task_id: this.edit_task_id,
      description: this.edit_description,
      end_time: this.edit_end_time,
      title: this.edit_title,
      work_location: this.edit_work_location,
    }).subscribe(response => {
      console.log(response);
    });
  }

  ApproveTask() {
    this.httpClient.post("https://localhost:5001/tasks/approve-task", {
      task_id: this.edit_status_task_id,
    }).subscribe(response => {
      console.log(response);
    })
  }

  RejectTask() {
    this.httpClient.post("https://localhost:5001/tasks/reject-task", {
      task_id: this.edit_status_task_id,
    }).subscribe(response => {
      console.log(response);
    });
  }

  SetTaskWaiting() {
    this.httpClient.post("https://localhost:5001/tasks/set-task-waiting", {
      task_id: this.edit_status_task_id,
    }).subscribe(response => {
      console.log(response);
    });
  }
}
