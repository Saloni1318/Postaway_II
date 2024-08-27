import PostsModel from "../posts/posts.model.js";

export default class LikeModel{
    constructor(postID,userID,status,id){
        this._id = id;
        this.postID = postID;
        this.userID = userID;
        this.status = status;
    }

    static getLikes(postID){
        const data = likes.filter((i)=>i.postID==postID);
        return data;
    }

    static toggleLike(postID , userID){
        const like = likes.find((i)=>i.postID==postID && i.userID==userID);
        if(!like){
            new LikeModel(postID,userID,'Yes');
            return 'Your like has been added';
        }
        if(like.status=='Yes'){
            like.status='No';
            return 'Your like status has been changed to No';
        }
        else{
            like.status='Yes';
            return 'Your like status has been changed to Yes';
        }

    }
}

var likes = [
    new LikeModel(1,1,1,'Yes'),
    new LikeModel(2,1,2,'No'),
    new LikeModel(3,2,2,'Yes')
]