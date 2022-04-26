export class LoadUserResponse {
  public status_code: number = 1;
  public user: User = new User();
  public permissions: Permission[] = [];
}

export class User {
  public id: number = 0;
  public name: string = "";
  public lastname: string = "";
  public username: string = "";
  public company_level: string = "";
  public skill_level: string = "";
}

export class Permission {
  title: string = "";
}
