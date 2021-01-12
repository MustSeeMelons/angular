import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort",
  pure: false,
})
export class SortPipe implements PipeTransform {
  transform(value: { status: string }[]): unknown {
    if (value.length === 0) {
      return value;
    }

    const stable = value.filter((val) => {
      return val.status === "stable";
    });

    const offline = value.filter((val) => {
      return val.status === "offline";
    });

    const critical = value.filter((val) => {
      return val.status === "critical";
    });

    return [...critical, ...offline, ...stable];
  }
}
