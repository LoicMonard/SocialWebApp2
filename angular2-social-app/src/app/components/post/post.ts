import { Component, Input } from '@angular/core';
import { Post, YoutubePostContent, PicturePostContent, VideoPostContent, PostContent } from 'models';
import { PostService, PostSocketService, LoggedUser, MessageParser } from 'services';

/**
 * Display a user post with comments and like 
 */
@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent { 
    @Input() post: Post;
    // isYoutubeContent: boolean = false;
    // isPictureContent: boolean = false;
    // isVideoContent: boolean = false;
    isMediaContent: boolean = false;
    
    constructor(
        private postSocket: PostSocketService, 
        private user: LoggedUser,
        private postService: PostService,
        private parser: MessageParser
    ) {}

    ngOnInit() {
        this.post.contents = this.parser.parse(this.post);
        // this.postService.getAll().then( post => { this.post})
    }

    isYoutubeContent(postContent: PostContent<any>): boolean {
        return postContent instanceof YoutubePostContent;
    }
    isVideoContent(postContent: PostContent<any>): boolean {
        return postContent instanceof VideoPostContent;
    }
    isPictureContent(postContent: PostContent<any>): boolean {
        return postContent instanceof PicturePostContent;
    }

    /**
     * Send the new post message to the server
     * @param message message to send
     */
    onComment(message: string) {
    }
}
