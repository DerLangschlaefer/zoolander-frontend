import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Post} from "./post";
import {Comment} from "../comment/comment";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {CookieService} from "ngx-cookie-service";
import {User} from "../user/user";
import {ResponseEntity} from "../responseEntity"

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, AfterViewInit{

  posts?: Post[];
  private sanitizer: DomSanitizer;
  newPost: Post = {} as Post;
  newComment: Comment = {} as Comment;
  author: User = {} as User;
  width: number = window.innerWidth / 2;
  height: number = (this.width / 16) * 9;

  constructor(private http: HttpClient, sanitizer: DomSanitizer, private cookieService: CookieService) {
    this.sanitizer = sanitizer;
  }

  ngOnInit(): void {
    this.load();
    this.author.name = this.cookieService.get('name');
    this.author.password = this.cookieService.get('password');
  }

  load() {
    this.http.get<Post[]>("http://localhost:8080/api/posts").subscribe(jsonArray => this.posts = jsonArray);
  }

  save() {
    this.http.post<Post[]>("http://localhost:8080/api/posts", this.newPost).subscribe(jsonArray => this.posts = jsonArray);
  }

  ngAfterViewInit(): void {
    this.volumeControl();
    this.observeVideo();
  }

  // you need this method to embed the video. otherwise angular treats video links as strings
  getEmbeddedVideoUrl(post: Post): SafeResourceUrl {
    const lastIndex = post.link.lastIndexOf("/");
    const videoId = this.getVideoIdFromPost(post);
    const embeddedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embeddedUrl);
  }

  load() {
    this.http.get<Post[]>("http://localhost:8080/api/posts").subscribe((jsonArray) => this.posts = jsonArray);
  }

  getVideoIdFromPost(post: Post) {
    const lastIndex = post.link.lastIndexOf("/");
    return post.link.slice(lastIndex + 1);
  }

  save() {
    this.http.post<Post[]>("http://localhost:8080/api/posts", this.newPost)
      .subscribe((jsonArray) => this.posts = jsonArray);
  }

  observeVideo() {
    let videos = document.querySelectorAll("video");
    videos.forEach((video) => {

      // if set to true there is no way to unmute, unless you add the control attribute into the video tag
      video.muted = false;

      let playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          let observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.intersectionRatio !== 1 && !video.paused) {
                  video.pause();
                } else if (video.paused && !video.ended) {
                  video.play();
                }
              });
            },
            { threshold: 0.75 }
          );
          observer.observe(video);
        });
      }
    });
  }

  comment(post: Post) {
    this.newComment.authorID = this.cookieService.get('userID');
    this.newComment.postID = post.postID;
    console.log("my new comment: ", this.newComment);
    this.http.post<Comment>("http://localhost:8080/api/comment", this.newComment).subscribe(() => {
      // there should be a check here whether the java ResponseEntity returns HttpStatus.OK...
      this.load()
    });
  }

  volumeControl() {
    const videos = document.querySelectorAll("video");
    const volumeSlider = document.getElementById("volumeSlider") as HTMLInputElement;

    videos.forEach((video) => {
      volumeSlider.addEventListener("input", () => {
        video.volume = parseFloat(volumeSlider.value);
      });
    });
  }

  createVideosContainer() {
    console.log("createVideosContainer() called");
    let container = document.getElementById('container');
    console.log(container);
    let i = 0;

    //this.posts?.forEach((post) => {
    if (this.posts !== undefined) {
      console.log("this.posts is not undefined");
      while (i < this.posts.length) {

        let div = document.createElement('div');
        container?.appendChild(div);

        let videoSrc = 'assets/sample-5s.mp4';

        let video = document.createElement('video');
        video.width = this.width;
        video.height = this.height;

        let source = document.createElement('source');
        source.src = videoSrc;
        source.type = 'video/mp4';

        video.appendChild(source);
        div.appendChild(video);

        //});
        i++;
      }
    }
  }
}
