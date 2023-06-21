import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from "./comment" // had to import this manually

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comments?: Comment[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<Comment[]>('http://localhost:8080/api/comments').subscribe((jsonArray) => {
      this.comments = jsonArray;
    });
  }

}
