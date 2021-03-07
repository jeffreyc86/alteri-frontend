import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux' 
import Picker from 'emoji-picker-react';

function MessageForm () {

    const [content, setContent] = useState("")
    const [showEmojis, setShowEmojis] = useState(false)

    const currentUser = useSelector(state=>state.user.currentUser)
    const convoId = useSelector(state=>state.conversations.convoId)

    const addEmoji = (e, emoji) => {
        setContent(content=>content + emoji.emoji)
    };

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick, false);
      });

    
      const handleDocumentClick = event => {
        let isEmojiClassFound = false;
    
        event &&
          event.path &&
          event.path.forEach(elem => {
            if (elem && elem.classList) {
              const data = elem.classList.value;
              if (data.includes("emoji")) {
                isEmojiClassFound = true;
              }
            }
          }); // end
        if ( isEmojiClassFound === false && event.target.id !== "emoji-btn")
          setShowEmojis(false);
      };

    function handleSubmit (e) {
        e.preventDefault()

        fetch(`${process.env.REACT_APP_RAILS_URL}messages`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                conversation_id: convoId,
                user_id: currentUser.id,
                content: content
            })
        })
            // .then(res=>res.json)

        setContent("")
    }

    return (
        <div className='new-message'>
            <form className="message-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={content}
                    onChange={(e)=>{setContent(e.target.value)}}
                    placeholder="start typing..."
                />
                <button type='submit'>Send</button>
            </form>
            {showEmojis && <span className="emoji-picker"><Picker onEmojiClick={addEmoji} /></span>}
            <p id="emoji-btn" onClick={()=>{setShowEmojis(show=>!show)}}>{String.fromCodePoint(0x1f60a)}</p>
        </div>
    )
}

export default MessageForm