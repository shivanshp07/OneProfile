import { useEffect, useState } from 'react';
import io from 'socket.io-client'
const socket = io.connect("http://localhost:5000");

function getUserOpname() {
    let item = localStorage.getItem("username");
    item = JSON.parse(item);
    return item;
}

const Messaging = () => {
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const sendMessage = () => {
        socket.emit("send_message", {
            name: getUserOpname(),
            message,
        })
        setMessage("");
    }
    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            if(data.name === getUserOpname()) return;
            // alert(`Message from ${data.name}: ${data.message}`)
            let newMessages = allMessages;
            newMessages.push(data);
            setAllMessages(newMessages);
            console.log(allMessages)
        })
    }, [socket])

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", height: "calc(100vh - 50px)", padding: "10px", boxSizing: "border-box" }}>
        <h1>Messages</h1>
        <div style={{border: "1px solid green", height: "100%"}}>
            {allMessages?.map((singleMessage, index) => {
                return(
                    <div style={{backgroundColor: "grey"}} key={index}>
                    <p>From: {singleMessage.name}</p>
                    <bold>{singleMessage.message}</bold>
                </div>
                );
            })}
        </div>
        <div>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}></input>
        <button onClick={sendMessage}>Send Message</button>
        </div>
      </div>
    </>
  );
};

export default Messaging;
