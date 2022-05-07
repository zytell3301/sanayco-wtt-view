import {Task} from "../entities/Task";

export class GetTaskResponse {
  status_code: number = 1;
  Task: Task = new Task();
}
