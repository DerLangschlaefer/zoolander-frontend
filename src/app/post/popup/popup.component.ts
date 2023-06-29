import {Component, OnInit} from '@angular/core';
import {Comment} from '../../comment/comment';
import {MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {CommentsRequest} from "../../comment/commentsRequest";
import {CookieService} from "ngx-cookie-service";
import {NewCommentRequest} from "../../comment/newCommentRequest";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  comments?: Comment[];
  newComment: NewCommentRequest = {} as NewCommentRequest;

  constructor(private dialogRef: MatDialogRef<PopupComponent>, private http: HttpClient, private cookieService: CookieService) {
    this.newComment.authorID = this.cookieService.get('userID');
    this.newComment.postID = this.cookieService.get('postID');
  }

  ngOnInit() {
    const commentsRequest: CommentsRequest = {postID: this.cookieService.get('postID')};
    this.load();
  }

  load() {
    this.http.get<Comment[]>("http://localhost:8080/api/comments").subscribe(commentsArray => {
      this.comments = commentsArray;
    })
  }

  close(): void {
    this.dialogRef.close();
  }

  postComment() {
    console.log("my new comment: ", this.newComment);
    this.http.post<Comment[]>("http://localhost:8080/api/comment", this.newComment).subscribe(commentsArray => {
      this.comments = commentsArray;
    });
  }

}
