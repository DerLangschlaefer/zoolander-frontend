import {Comment} from "../comment/comment";
import {Logger} from "../user/logger";

export interface Post {
  postID: string,
  link: string;
  author: Logger;
  comments: Comment[];
}
