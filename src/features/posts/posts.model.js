// import { ApplicationError } from '../../error-handler/applicationError.js';
// import UserModel from '../user/user.model.js'
export default class PostsModel{
    constructor(userID,caption,imageUrl,id){
        this.userId = userID;
        this.caption = caption;
        this.imageUrl = imageUrl;
        this._id = id;
    }
} 

var posts = [
    new PostsModel(
      1,
      1,
      'Caption for Post 1',
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg'
    ),
    new PostsModel(
      2,
      1,
      'Caption for Post 2',
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg'
    ),
    new PostsModel(
      3,
      2,
      'Caption for Post 3',
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg'
    )];