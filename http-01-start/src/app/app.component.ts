import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IPost, PostsService } from "./posts.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching = false;
  error;
  errSub: Subscription;

  constructor(private postService: PostsService) {}

  ngOnInit() {
    // this.onFetchPosts();

    this.errSub = this.postService.error.subscribe((error) => {
      this.error = error;
    });
  }

  ngOnDestroy(): void {
    this.errSub.unsubscribe();
  }

  onCreatePost(postData: IPost) {
    this.postService.createPost(postData);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      (posts) => {
        if (posts) {
          this.loadedPosts = posts as IPost[];
        }
        this.isFetching = false;
      },
      (e) => {
        this.error = e.message;
        this.isFetching = false;
      }
    );
  }

  onClearPosts() {
    this.postService.clearPosts().subscribe((data) => {
      this.loadedPosts = [];
    });
  }

  onClearError = () => {
    this.error = undefined;
  };
}
