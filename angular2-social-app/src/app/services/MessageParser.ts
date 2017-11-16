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
        let pictureMatch = pictureRegex.exec(post.message);
        debugger;
        while(pictureMatch) {
            // return picture content
            mediaContents.push(new PicturePostContent(pictureMatch[0]));
            pictureMatch = pictureRegex.exec(post.message);

        }

        const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
        // return YoutubeContent if match
        let youtubeMatch: RegExpExecArray = youtubeRegex.exec(post.message);
        while(youtubeMatch != null) {
            let video_id = youtubeMatch[0].split('v=')[1];
            mediaContents.push(new YoutubePostContent(video_id));
            youtubeMatch = youtubeRegex.exec(post.message);
        }


        const videoRegex = /http[s]?:\/\/.+\.(mp4|mov|mkv|avi)/gmi; // TODO
        // return VideoContent if match
        let videoMatch = videoRegex.exec(post.message);
        while(videoMatch) {
            mediaContents.push(new VideoPostContent(videoMatch[0]));
            videoMatch = videoRegex.exec(post.message);
        }

        return mediaContents;
    }
}
