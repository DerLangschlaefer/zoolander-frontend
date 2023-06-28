import { Component } from '@angular/core';
import {Post} from "../post";
import {HttpClient} from "@angular/common/http";
import {PostRequest} from "./postRequest";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  posts?: Post[];
  postRequest: PostRequest = {} as PostRequest;
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.postRequest.posterID = this.cookieService.get('userID');
  }
  save() {this.http.post<Post[]>("http://localhost:8080/api/posts", this.postRequest)
    .subscribe(postArray => this.posts = postArray)
  }

}
