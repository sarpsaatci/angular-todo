export class Task {

  summary: string;
  detail: string;
  date: Date;
  done: boolean;

  constructor(summary: string, detail: string, date: Date, done: boolean) {

    this.summary = summary;
    this.detail = detail;
    this.date = date;
    this.done = done;
  }

}
