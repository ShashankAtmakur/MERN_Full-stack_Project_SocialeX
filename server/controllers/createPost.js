import Post from '../models/Post.js';

export const createPost = async (req, res) =>{
    try{

        const newPost = new Post({
            ...req.body,
            likes: req.body.likes || [],
            comments: req.body.comments || []
        });

        const post = await newPost.save();
        res.status(201).json(post);
    }catch(e){
        res.status(500).json({error: e.message});
    }
}