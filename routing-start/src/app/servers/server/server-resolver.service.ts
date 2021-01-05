import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { ServersService } from "../servers.service";

@Injectable()
export class ServerResolver
  implements Resolve<{ id: number; name: string; status: string }> {
  constructor(private serversService: ServersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.serversService.getServer(+route.params["id"]);
  }
}
