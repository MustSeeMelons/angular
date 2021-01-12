import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "filter", pure: false })
export class FilterPipe implements PipeTransform {
  transform(value: any[], filter: string) {
    if (value.length === 0 || filter === "") {
      return value;
    }

    return value.filter((val) => {
      return val.status.indexOf(filter) >= 0;
    });
  }
}
