import React, { useContext, useEffect, useState } from 'react';
import '../styles/Posts.css';
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { FaGlobeAmericas } from "react-icons/fa";
import {IoIosPersonAdd} from 'react-icons/io'
import axios from 'axios';
import { GeneralContext } from '../context/GeneralContextProvider';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const Post = () => {

    const navigate = useNavigate();

    const {socket} = useContext(GeneralContext);


    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPosts();
      }, []);
    
      const fetchPosts = async () => { 
        try {
                    const response = await axios.get(`${API_URL}/fetchAllPosts`);
          const fetchedPosts = response.data;
          setPosts(fetchedPosts);
                } catch (error) {
                    setError('Unable to load posts right now.');
                } finally {
                    setIsLoading(false);
        }
      };



    //   Like

    const handleLike = (userId, postId) =>{
        socket.emit('postLiked', {userId, postId});

    }

    const handleUnLike = (userId, postId) =>{
        socket.emit('postUnLiked', {userId, postId});

    }

    
    useEffect(()=>{
        const handleLikeUpdated = () => fetchPosts();
        const handleUserFollowed = ({following})=>{

            localStorage.setItem('following', following);
            setPosts((currentPosts) => [...currentPosts]);
        };
        socket.on("likeUpdated", handleLikeUpdated);
        socket.on('userFollowed', handleUserFollowed);

        return () => {
            socket.off('likeUpdated', handleLikeUpdated);
            socket.off('userFollowed', handleUserFollowed);
        };

    },[socket])


    const handleFollow = async (userId) =>{
        // ownId = current user Id
        // followingUserId = user you want to follow
        socket.emit('followUser', {ownId: localStorage.getItem('userId'), followingUserId: userId});
    }



    const [comment, setComment] = useState('');

    const handleComment = (postId, username)=>{
        socket.emit('makeComment', {postId, username, comment});
    }



  return (
    <div className='postsContainer'>

    {isLoading ? <p className="feedStatus">Loading posts...</p> : error ? <p className="feedStatus error">{error}</p> : posts.length === 0 ? <p className="feedStatus">No posts yet. Share something with your community.</p> : posts.map((post) => {

        return(

        <div className="Post" key={post._id}>

        <div className="postTop">
            <div className="postTopDetails">
                <img src={post.userPic} alt="" className="userpic" />
                <h3 className="usernameTop" onClick={()=> navigate(`/profile/${post.userId}`)}>{post.userName}</h3>
            </div>

            {(localStorage.getItem('following') || '').includes(post.userId) || localStorage.getItem('userId') === post.userId ?
            
            <></>
            :
            <IoIosPersonAdd style={{cursor: "pointer"}} id='addFriendInPost' onClick={()=>handleFollow(post.userId)} />
             }

        </div>

        { post.fileType === 'photo'?
                
                <img src={post.file} className='postimg' alt="" />
            
                :
                
                <video id="videoPlayer" className='postimg' controls autoPlay muted>
                    <source src={post.file} />
                </video>
                
                }

        <div className="postReact">
            <div className="supliconcol">

                {
                    post.likes.includes(localStorage.getItem('userId')) ?

                    <AiTwotoneHeart className='support reactbtn'  onClick={() => handleUnLike(localStorage.getItem('userId'), post._id)}/>

                    :

                    <AiOutlineHeart className='support reactbtn'  onClick={() => handleLike(localStorage.getItem('userId'), post._id)}/>
                }


                
                <label htmlFor="support" className='supportCount'>{post.likes.length}</label>
            </div>
            {/* <BiCommentDetail className='comment reactbtn' /> */}
            {/* <FiSend className='share reactbtn' onClick={()=> {handleShare(post)}} /> */}
            <div className="placeiconcol">
                <FaGlobeAmericas className='placeicon reactbtn' name='place' />
                <label htmlFor="place" className='place'>{post.location}</label>
            </div>
        </div>

        

        <div className="detail">
            <div className='descdataWithBtn'>
                <label htmlFor='username' className="desc labeldata" id='desc'> 
                    <span style={{fontWeight: 'bold'}}>
                        {post.userName}
                    </span> 
                        &nbsp;   {post.description}
                </label>
            </div>
        </div>
        <div className="commentsContainer">
            <div className="makeComment">
                <input type="text" placeholder='type something...' onChange={(e)=>setComment(e.target.value)}/>
                {comment.length === 0 ?
                    <button className='btn btn-primary' disabled>comment</button>
                :
                    <button className='btn btn-primary' onClick={()=>handleComment(post._id, localStorage.getItem('username'))} >comment</button>
                }
            </div>
            <div className="commentsBody">
                <div className="comments">
                    {(post.comments || []).map((comment, index)=>{
                        return(

                            <p key={`${post._id}-comment-${index}`}><b>{comment[0]}</b> {comment[1]}</p>
                        )
                    })}
                </div>
            </div>
        </div>
        </div>
        )

    })}

    </div>
  )
}

export default Post