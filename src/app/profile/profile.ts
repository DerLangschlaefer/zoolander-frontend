import {Post} from "../post/post";
import {Comment} from "../comment/comment";

export interface Profile {
  icon: string,
  username: string,
  followers: number,
  following: number,
  bio: string
  // posts: Post[],
  // comments: Comment[]
}
