import {Task} from "../entities/Task";

export class GetTaskResponse {
  Code: number = 1;
  Task: Task = new Task();
}
