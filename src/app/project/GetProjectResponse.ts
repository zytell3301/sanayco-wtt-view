import {Project} from "../entities/Project";

export class GetProjectResponse {
  StatusCode: number = 1;
  Project: Project = new Project();
}
