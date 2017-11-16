import {
    Post,
    PostContent,
    YoutubePostContent,
    PicturePostContent,
    VideoPostContent,
    TextPostContent
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
        let contents: PostContent<any>[] = [];
        
        let contentString: string = post.message;
        let indexUrl: number;
        let matchUrl: string;
        while(contentString.length > 0) {
            const urlRegex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gmi;
            const pictureRegex = /http[s]?:\/\/.+\.(jpeg|png|jpg|gif)/gmi;
            const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
            const videoRegex = /http[s]?:\/\/.+\.(mp4|mov|mkv|avi)/gmi; // TODO
            indexUrl = contentString.search(urlRegex);
            if(indexUrl === -1){
                contents.push(new TextPostContent(contentString));
                contentString = "";
            }
            else if(indexUrl !== 0) {
                contents.push(new TextPostContent(contentString.substring(0, indexUrl-1)));
                contentString = contentString.substring(indexUrl);
            }
            else {
                matchUrl = urlRegex.exec(contentString)[0];
                if(pictureRegex.exec(matchUrl))
                    contents.push(new PicturePostContent(matchUrl))
                else if(youtubeRegex.exec(matchUrl)) {
                    let video_id = matchUrl.split('v=')[1];
                    contents.push(new YoutubePostContent(video_id));
                }
                else if(videoRegex.exec(matchUrl))
                    contents.push(new VideoPostContent(matchUrl));
                else
                    contents.push(new TextPostContent(matchUrl));

                contentString = contentString.substring(matchUrl.length);
                contentString = contentString.trim();
            }
        }
        return contents;
    }
}
