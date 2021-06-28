import React, { useEffect, useState, useRef } from "react";
import Style from "./Messenger.module.css";
import ForumIcon from "@material-ui/icons/Forum";
import SendIcon from "@material-ui/icons/Send";
import Messages from "./Messages";
import db from "./Firebase";
import firebase from "firebase";
import useSound from "use-sound";
import receive from "./insight-578.mp3";
import send from "./done-for-you-612.mp3";
import { useParams } from "react-router-dom";
import { storage } from "./Firebase";

const Messenger = () => {
  const [volume, SetVolume] = useState(0.3);
  const [playReceive] = useSound(receive, { volume });
  const [playSend] = useSound(send, { volume });
  const messageEndRef = useRef(null);
  const [user, Setuser] = useState("");
  const [myMessage, SetmyMessage] = useState("");
  const [data, Setdata] = useState([]);
  const [typer, Settyper] = useState({ username: null });
  const [imageData, SetimageData] = useState({ image: null });
  const params = useParams();
  const [count, Setcount] = useState(1);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (
      count > 1 &&
      data.length > 0 &&
      data[data.length - 1].username != user
    ) {
      playReceive();
    }
    Setcount((count) => count + 1);
  }, [data]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--base-color",
      `#${params.pickcolor}`
    );
    document.documentElement.style.setProperty(
      "--base-transparent",
      `#${params.pickcolor}99`
    );
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

  const clicked = async (e) => {
    e.preventDefault();
    let url = null;
    if (imageData.image != null) {
      let uploadTask = storage
        .ref(`images/${imageData.image.name}`)
        .put(imageData.image);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
          let progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            2
          );
          document.getElementById('progress').style.width = `${progress}%`;
          console.log(progress);
          console.log(snapshot.bytesTransferred);
        },
        function (error) {
          alert("upload failed!");
        },
        async function () {
          document.getElementById("progress").style.width = "0";
          url = await storage
            .ref("images")
            .child(imageData.image.name)
            .getDownloadURL();
          db.collection(params.roomName).add({
            message: myMessage,
            imageUrl: url,
            username: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
          SetimageData({ image: null });
          document.getElementById("file").value = null;
          playSend();
          SetmyMessage("");
        }
      );
    }
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
                    url={item.imageUrl}
                  />
                  <div ref={messageEndRef} />
                </>
              );
            })}
          </div>
          <div className={Style.type}>
            <form onSubmit={clicked}>
              <div className={Style.progress} id="progress"></div>
              <textarea
                placeholder="Type your message..."
                onChange={(event) => {
                  SetmyMessage(event.target.value);
                }}
                value={myMessage}
              ></textarea>
              <input
                id="file"
                type="file"
                onChange={(event) => {
                  SetimageData((prev) => {
                    return { ...prev, image: event.target.files[0] };
                  });
                }}
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
