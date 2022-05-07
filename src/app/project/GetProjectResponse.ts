import {Project} from "../entities/Project";

export class GetProjectResponse {
  status_code: number = 1;
  Project: Project = new Project();
}
