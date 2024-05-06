export interface Response {
  code: number;
  status: string;
  description: string;
}

export class ResponseUtil {
  CODE: number;
  STATUS: string;
  DESCRIPTION: string;

  constructor(code: number, status: string, description: string) {
    this.CODE = code;
    this.STATUS = status;
    this.DESCRIPTION = description;
  }

  setMetadata(obj: Response) {
    this.CODE = obj.code;
    this.STATUS = obj.status;
    this.DESCRIPTION = obj.description;
  }

  setMetadataSuper(obj: ResponseUtil) {
    this.CODE = obj.CODE;
    this.STATUS = obj.STATUS;
    this.DESCRIPTION = obj.DESCRIPTION;
  }

  setCode(code: number) {
    this.CODE = code;
  }

  setStatus(status: string) {
    this.STATUS = status.toUpperCase();
  }

  setDescription(description: string) {
    this.DESCRIPTION = description;
  }
}
