import {Component, OnInit} from '@angular/core';
import {Post} from "./post";
import {HttpClient} from "@angular/common/http";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{

  posts?: Post[];
  private sanitizer: DomSanitizer;

  constructor(private http: HttpClient, sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
  }

  getEmbeddedVideoUrl(youtubeLink: string): SafeResourceUrl {
    const videoId = "dm8Q4fgv8Qo";
    const embeddedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embeddedUrl);
  }
  ngOnInit(): void {
    this.http.get<Post[]>("http://localhost:8080/api/post").subscribe((jsonArray) => {
      this.posts = jsonArray;
    });
  }

}
