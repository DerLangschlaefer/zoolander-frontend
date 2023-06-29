import {Component, OnInit} from '@angular/core';
import {Comment} from '../../comment/comment';
import {MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {NewCommentRequest} from "../../comment/newCommentRequest";
import {Post} from "../post";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  post: Post = {} as Post;
  width: number = window.innerWidth / 2;
  height: number = (this.width / 16) * 9;
  newComment: NewCommentRequest = {} as NewCommentRequest;

  constructor(private dialogRef: MatDialogRef<PopupComponent>, private http: HttpClient, private cookieService: CookieService, private sanitizer: DomSanitizer) {
    this.newComment.authorID = this.cookieService.get('userID');
    this.newComment.postID = this.cookieService.get('postID');
  }

  ngOnInit() {
    this.http.get<Post>("http://localhost:8080/api/" + this.cookieService.get('postID')).subscribe(post => {
      this.post = post;
    });
  }

  close(): void {
    this.cookieService.delete('postID');
    this.dialogRef.close();
  }

  postComment() {
    console.log("my new comment: ", this.newComment);
    this.http.post<Comment[]>("http://localhost:8080/api/comment", this.newComment).subscribe(commentsArray => {
      this.post.comments = commentsArray;
    });
  }

  getEmbeddedVideoUrl(post: Post): SafeResourceUrl {
    const videoId = this.getVideoIdFromPost(post);
    const embeddedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embeddedUrl);
  }

  getVideoIdFromPost(post: Post) {
    const lastIndex = post.link.lastIndexOf("/");
    return post.link.slice(lastIndex + 1);
  }

}
