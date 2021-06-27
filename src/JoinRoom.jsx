import React from "react";
import Style from "./JoinRoom.module.css";
import Button from "@material-ui/core/Button";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { useState, useEffect } from "react";
import db from "./Firebase";
import { CropSquareSharp } from "@material-ui/icons";

const JoinRoom = (props) => {
  const [roomName, SetroomName] = useState("");
  const [roomPassword, SetroomPassword] = useState("");
  const [userName, SetuserName] = useState("");
  const [rooms, Setrooms] = useState([]);
  const [color, Setcolor] = useState("#000080");
  let doesRoomExist = false;

  //   useEffect(() => {
  //     if (isRoomExist) {
  //       props.history.push(`/messenger/${roomName}/${userName}`);
  //     } else {
  //       alert("Invalid");
  //     }
  //   }, [isRoomExist]);

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
      if (room.roomname === roomName && room.roompassword === roomPassword) {
        doesRoomExist = true;
      }
    });

    if (doesRoomExist === true) {
      props.history.push(`/messenger/${roomName}/${userName}/${color.substring(1)}`);
    } else {
      setTimeout(() => alert("Invalid chat room name or password!"), 100);
    }

    SetroomName("");
    SetroomPassword("");
  };

  return (
    <>
      <div className={Style.container}>
        <div className={Style.card}>
          <form autoComplete="off" onSubmit={submit}>
            <div className={Style.heading}>Join Room</div>
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
            ></input>
            <input
              type="text"
              placeholder="enter user name"
              onChange={(event) => {
                SetuserName(event.target.value);
              }}
              required
              value={userName}
            ></input>
            <div className={Style.colorPicker}>
              <span
                style={{
                  color: "salmon",
                  fontSize: "0.8em",
                  fontWeight: "bold",
                }}
              >
                Pick your fav color :{" "}
              </span>
              <input
                type="color"
                onChange={(event) => {
                  Setcolor(event.target.value);
                }}
              ></input>
            </div>
            <Button
              className={Style.btn}
              type="submit"
              variant="contained"
              color="secondary"
            >
              Join
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default JoinRoom;
