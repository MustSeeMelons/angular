import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";

export interface IPost {
  title: string;
  content: string;
  id?: string;
}

interface IFetchPostResponse {
  [key: string]: IPost;
}

@Injectable()
export class PostsService {
  error = new Subject<string>();
  constructor(private http: HttpClient) {}

  createPost = (postData: IPost) => {
    this.http
      .post(
        "https://ng-complete-guide-11d5a-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
        postData,
        {
          observe: "response",
          responseType: "text",
        }
      )
      .subscribe(
        (data) => {
          // console.log(data);
        },
        (e) => {
          this.error.next(e.message);
        }
      );
  };

  fetchPosts = () => {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("print", "pretty");
    searchParams = searchParams.append("ignore", "true");

    return this.http
      .get<IFetchPostResponse>(
        "https://ng-complete-guide-11d5a-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
        {
          headers: new HttpHeaders({
            custom: "ha ha",
          }),
          params: searchParams,
        }
      )
      .pipe(
        map((data) => {
          if (!data) {
            return data;
          }
          return Object.keys(data).map((key) => {
            return {
              ...data[key],
              id: key,
            };
          }) as IPost[];
        }),
        catchError((e) => {
          // Analytics, or wahtever
          return throwError(e);
        })
      );
  };

  clearPosts = () => {
    return this.http
      .delete(
        "https://ng-complete-guide-11d5a-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
        {
          observe: "events",
        }
      )
      .pipe(
        tap((event) => {
          // console.log(event);
          if (event.type === HttpEventType.Sent) {
            // console.log("delete sent");
          }
        })
      );
  };
}
