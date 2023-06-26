import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Post} from "./post";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, AfterViewInit{

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

  ngAfterViewInit(): void {
    this.observeVideo();
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

  getVideoHeight(): string {
    const width = window.innerWidth * 0.5;
    const height = (width / 16) * 9;
    return `${height}px`;
  }

  observeVideo() {
    let videos = document.querySelectorAll("video");
    videos.forEach((video) => {

      video.muted = false;
      let playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          let observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.intersectionRatio !== 1 && !video.paused) {
                  video.pause();
                } else if (video.paused) {
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
}
