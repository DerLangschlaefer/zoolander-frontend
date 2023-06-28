import {Comment} from "../comment/comment";
import {User} from "../user/user";

export interface Post {
  postID: string,
  link: string;
  author: User;
  comments: Comment[];
}
