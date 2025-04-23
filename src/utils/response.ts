export class ApiRes<D, E> {
  public success: boolean;
  public data?: D;
  public error?: E;

  constructor(
    public statuscode: number,
    public message: string,
    dataOrError?: D | E,
  ) {
    this.statuscode = statuscode;
    this.message = message;
    this.success = statuscode < 400;

    if (this.success) this.data = dataOrError as D;
    else this.error = dataOrError as E;
  }
}
