import {OffTime} from "../entities/OffTime";

export class GetOffTimeResponse {
  StatusCode: number = 0
  OffTime: OffTime = new OffTime();
}
