import React from 'react'


function MessagesNav ({showList, setShowList}) {

    return (
        <div className="dropdown">
                    <div className="menu-div">
                        <button className="mess-drop-btn" onClick={()=>setShowList(show=>!show)}>
                            <img className="mess-btn" src={process.env.PUBLIC_URL + "/images/messages.png"} alt="messages"/>
                        </button>
                        <span>Messages</span>
                    </div>
                    {showList ? 
                        <div className="dropdown-content">
                            test
                            test
                        </div> 
                        : null}
        </div>
    )
}

export default MessagesNav