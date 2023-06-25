import {Component, OnInit} from '@angular/core';
import {Post} from "./post";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{

  posts?: Post[];
  private sanitizer: DomSanitizer;
  newPost: Post = {postLink: ""};

  constructor(private http: HttpClient, sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
  }

  ngOnInit(): void {
    this.http.get<Post[]>("http://localhost:8080/api/posts")
      .subscribe((jsonArray) => this.posts = jsonArray);
  }

  // you need this method to embed the video. otherwise angular treats video links as strings
  getEmbeddedVideoUrl(post: Post): SafeResourceUrl {
    const videoId = this.getVideoIdFromPost(post);
    const embeddedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embeddedUrl);
  }

  getVideoIdFromPost(post: Post) {
    const lastIndex = post.postLink.lastIndexOf("/");
    return post.postLink.slice(lastIndex + 1);
  }

  save() {
    this.http.post<Post[]>("http://localhost:8080/api/posts", this.newPost)
      .subscribe((jsonArray) => this.posts = jsonArray);
  }
}
