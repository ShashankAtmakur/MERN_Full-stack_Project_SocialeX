import React, { useContext, useEffect } from 'react'
import {GeneralContext} from '../../context/GeneralContextProvider';
const Chats = () => {

  const {socket, chatFirends, setChatFriends, dispatch, chatData} = useContext(GeneralContext)

  const userId = localStorage.getItem('userId');

  // const [friendsData, setFriendsData] = useState([])

  useEffect(()=>{

    socket.emit('fetch-friends', {userId});

    const handleFriendsFetched = ({friendsData}) => {
      setChatFriends(friendsData);
    };
    socket.on("friends-data-fetched", handleFriendsFetched);

    return () => socket.off('friends-data-fetched', handleFriendsFetched);
  },[setChatFriends, socket, userId])

  
  const handleSelect = (data) =>{
    dispatch({type:"CHANGE_USER", payload: data});
    console.log(chatData);


  }
  useEffect(()=>{

    if(chatData.chatId){
      socket.emit('fetch-messages', {chatId: chatData.chatId})
      
    }
  }, [chatData, socket])



  return (
    <div className='chats'>
      
   {chatFirends.map((data)=>{

    return(
      <div className="userInfo" key={data._id} onClick={()=> handleSelect(data)} >  {/* using chatId (combinedId as key(unique id)) */}
        <img src={data.profilePic} alt="" />
        <div className="userChatInfo">
          <span>{data.username}</span>
        </div>
      </div>
    )

   })}
      

    
    </div>
  )
}

export default Chats