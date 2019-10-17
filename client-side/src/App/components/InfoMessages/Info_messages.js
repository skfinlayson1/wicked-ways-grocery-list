import React from "react";

// Component to display error and possibly other types of messages
function InfoMessages(props) {
    if (props.messages) {
        return (
            <div id="errors">
                {props.messages.errors.map((err, index) => {
                    return <p className="error" key={index}>{err.msg}</p>
                })}                    
            </div> 
        )
    } else {
        return null
    }
    
}

export default InfoMessages;