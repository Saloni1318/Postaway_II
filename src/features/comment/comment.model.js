
export default class CommentModel{
    constructor(postID,userID,content,id){
        this._id = id;
        this.userID = userID;
        this.postID = postID;
        this.content = content;
    }
}

var comments = [
    new CommentModel(1,1,2,'Congratulations'),
    new CommentModel(2,2,2,'Happy Journey'),
    new CommentModel(3,2,1,'Interesting')
]