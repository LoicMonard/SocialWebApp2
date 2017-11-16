import {
    Post,
    PostContent,
    YoutubePostContent,
    PicturePostContent,
    VideoPostContent
}
    from '../models';
import { debug } from 'util';
import { port } from '_debugger';



const youtube = "https://youtu.be/";

/**
 * Parse post content
 */
export class MessageParser {

    parse(post: Post): PostContent<any>[] {
        let mediaContents: PostContent<any>[] = [];

        const pictureRegex = /http[s]?:\/\/.+\.(jpeg|png|jpg|gif)/gmi;
        const pictureMatche = pictureRegex.exec(post.message);

        if (pictureMatche) {
            // return picture content
            mediaContents.push(new PicturePostContent(post.message));
        }

        const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
        // return YoutubeContent if match
        if(youtubeRegex.exec(post.message)){
            let video_id = post.message.split('v=')[1];
            mediaContents.push(new YoutubePostContent(video_id));
        }


        const videoRegex = /http[s]?:\/\/.+\.(mp4|mov|mkv|avi)/gmi; // TODO
        // return VideoContent if match
        if(videoRegex.exec(post.message)) {
            mediaContents.push(new VideoPostContent(post.message));
        }

        return mediaContents;
    }
}
