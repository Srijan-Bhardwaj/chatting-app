import React, { useEffect, useState, useRef } from "react";
import Style from "./Messenger.module.css";
import ForumIcon from "@material-ui/icons/Forum";
import SendIcon from "@material-ui/icons/Send";
import Messages from "./Messages";
import db from "./Firebase";
import firebase from "firebase";
import useSound from 'use-sound';
import music from './pristine-609.mp3';

const Messenger = () => {
  const [play] = useSound(music);
  const messageEndRef = useRef(null);
  const [user, Setuser] = useState("unknown");
  const [myMessage, SetmyMessage] = useState("");
  const [data, Setdata] = useState([]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  useEffect(() => {
    const cleanUp = db
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        Setdata(snapshot.docs.map((doc) => doc.data()));
      });
    // console.log(cleanUp);
    return () => cleanUp();
  }, []);

  useEffect(() => {
    const name = prompt("enter name");
    Setuser(name);
    // console.log(data);
  }, []);

  const clicked = (e) => {
    e.preventDefault();
    db.collection("messages").add({
      message: myMessage,
      username: user === null||user==='' ? "unknown" : user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    SetmyMessage("");
  };

  return (
    <>
      <div className={Style.container}>
        <div className={Style.card}>
          <div className={Style.logo}>
            <ForumIcon className={Style.icon} />
          </div>
          <div className={Style.messages}>
            {data.map((item) => {
              return (
                <>
                  <Messages
                    text={item.message}
                    sender={item.username === user ? true : false}
                    name={item.username === user ? "" : item.username}
                    time={
                      item.timestamp
                        ? new Date(item.timestamp.seconds * 1000)
                        : new Date()
                    }
                  />
                  <div ref={messageEndRef} />
                </>
              );
            })}
          </div>
          <div className={Style.type}>
            <form onSubmit={clicked}>
              <input
                type="text"
                placeholder="Type your message..."
                onChange={(event) => {
                  SetmyMessage(event.target.value);
                }}
                required
                value={myMessage}
              ></input>
              <button type="submit" className={Style.submit}>
                <SendIcon />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
