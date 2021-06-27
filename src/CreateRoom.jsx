import React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import Style from "./CreateRoom.module.css";
import { useEffect } from "react";
import db from "./Firebase";

const CreateRoom = () => {
  const [roomName, SetroomName] = useState("");
  const [roomPassword, SetroomPassword] = useState("");
  const [rooms, Setrooms] = useState([]);
  let roomExist = false;

  useEffect(() => {
    db.collection("chatrooms").onSnapshot((snapshot) => {
      Setrooms(
        snapshot.docs.map((doc) => {
          return doc.data();
        })
      );
    });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    rooms.forEach((room) => {
      if (room.roomname === roomName) {
        roomExist = true;
      }
    });

    if (roomExist == true) {
      setTimeout(
        () => alert("Chat room already exist! Please enter different name."),
        100
      );
    } else {
      db.collection("chatrooms").add({
        roomname: roomName,
        roompassword: roomPassword,
      });
      setTimeout(() => alert("Chat room created successfully!"), 100);
    }

    SetroomName("");
    SetroomPassword("");
  };

  return (
    <>
      <div className={Style.wrapper}>
        <div className={Style.card}>
          <form autoComplete="off" onSubmit={submit}>
            <div className={Style.heading}>Create Room</div>
            <input
              type="text"
              placeholder="enter chat room name"
              onChange={(event) => {
                SetroomName(event.target.value);
              }}
              required
              value={roomName}
            ></input>
            <input
              type="password"
              placeholder="enter room password"
              onChange={(event) => {
                SetroomPassword(event.target.value);
              }}
              required
              value={roomPassword}
              className={Style.password}
            ></input>
            <Button
              className={Style.btn}
              type="submit"
              variant="contained"
              color="primary"
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateRoom;
