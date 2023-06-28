import {User} from "../user/user";

export interface Comment {
  commentID: string,
  authorID: string,
  postID: string
  text: string,
}
