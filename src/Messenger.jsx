import React, { useEffect, useState, useRef } from "react";
import Style from "./Messenger.module.css";
import ForumIcon from "@material-ui/icons/Forum";
import SendIcon from "@material-ui/icons/Send";
import Messages from "./Messages";
import db from "./Firebase";
import firebase from "firebase";
import useSound from "use-sound";
import receive from "./insight-578.mp3";
import send from './done-for-you-612.mp3';
import { useParams } from "react-router-dom";

const Messenger = () => {
  const [volume,SetVolume] = useState(0.3);
  const [playReceive] = useSound(receive,{volume});
  const [playSend] = useSound(send,{volume})
  const messageEndRef = useRef(null);
  const [user, Setuser] = useState("");
  const [myMessage, SetmyMessage] = useState("");
  const [data, Setdata] = useState([]);
  const [typer, Settyper] = useState({ username: null });
  const params = useParams();
  let count=0;

  useEffect(() => {
    count++;
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if(data.length>0 && data[data.length-1].username!=user && count>1){
      playReceive();
    }
  }, [data]);

  useEffect(() => {
    document.documentElement.style.setProperty('--base-color',`#${params.pickcolor}`);
    document.documentElement.style.setProperty('--base-transparent',`#${params.pickcolor}99`);
    db.collection(params.roomName)
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        Setdata(
          snapshot.docs.map((doc) => {
            return doc.data();
          })
        );
      });
    db.collection("typer")
      .doc(params.roomName)
      .onSnapshot((doc) => {
        Settyper(doc.data());
      });
  }, []);

  useEffect(() => {
    if (typer.username == null || typer.username === "") {
      db.collection("typer").doc(params.roomName).set({
        username: user,
      });
      setTimeout(() => {
        db.collection("typer").doc(params.roomName).set({
          username: null,
        });
      }, 1000);
    }
  }, [myMessage]);

  useEffect(() => {
    const name = params.userName;
    Setuser(name == null || name == "" ? "unknown" : name);
  }, []);

  const clicked = (e) => {
    e.preventDefault();
    db.collection(params.roomName).add({
      message: myMessage,
      username: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    playSend();
    SetmyMessage("");
  };

  return (
    <>
      <div className={Style.container}>
        <div className={Style.card}>
          <div className={Style.logo}>
            <ForumIcon className={Style.icon} />
            <div className={Style.typer}>
              {typer.username === null ||
              typer.username === user ||
              typer.username === ""
                ? ""
                : `${typer.username} is typing...`}
            </div>
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
