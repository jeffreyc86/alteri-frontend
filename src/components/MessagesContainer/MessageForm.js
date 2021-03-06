import React, {useState, useEffect} from 'react'
import Picker from 'emoji-picker-react';

function MessageForm () {

    const [content, setContent] = useState("")
    const [showEmojis, setShowEmojis] = useState(false)

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

    // window.onclick = function(e) {
        
    //     if (!e.target.matches('.get-emoji-btn') && !e.target.matches('emoji-picker-react')) {
    //         setShowEmojis(false)
    //     }
    // }

    return (
        <div className='new-message'>
            MessageForm
      
            <form onSubmit={null}>
                <input 
                    type="text" 
                    value={content}
                    onChange={(e)=>{setContent(e.target.value)}}
                    placeholder="start typing..."
                />
            </form>
            {showEmojis && <span className="emoji-picker"><Picker onEmojiClick={addEmoji} /></span>}
            <p id="emoji-btn" onClick={()=>{setShowEmojis(true)}}>{String.fromCodePoint(0x1f60a)}</p>
        </div>
    )
}

export default MessageForm