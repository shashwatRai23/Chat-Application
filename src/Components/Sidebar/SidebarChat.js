import { Avatar, IconButton } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import "./SidebarChat.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Backdrop from "@mui/material/Backdrop";
import db from "../../firebaseFile";
import { Link } from "react-router-dom";
const SidebarChat = ({ addNewChat, id, name }) => {
  const [avatar, setAvatar] = useState("");
  const [open, setOpen] = React.useState(false);
  const [roomName, setRoomName] = React.useState("");
  const [messages, setMessages] = useState("");

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const chatInputHandler = (e) => {
    setRoomName(e.target.value);
  };

  const createChat = (e) => {
    e.preventDefault();
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
      setRoomName("");
      setOpen(false);
    }
  };

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setAvatar(Math.floor(Math.random() * 5000));
  }, []);
  return (
    <Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <div className="backdrop_content">
          <form>
            <input
              type="text"
              placeholder="Enter name of your new chat"
              onChange={chatInputHandler}
            />
            <div className="backdrop_btn">
              <button onClick={handleClose}>Cancel</button>
              <button type="submit" onClick={createChat}>
                Create
              </button>
            </div>
          </form>
        </div>
      </Backdrop>

      {!addNewChat ? (
        <Link to={`/rooms/${id}`}>
          <div className="sidebarChat">
            <Avatar
              src={`https://avatars.dicebear.com/api/avataaars/${avatar}.svg`}
            />
            <div className="sidebarChat_info">
              <h4>{name}</h4>
              <p>{messages[0]?.message}</p>
            </div>
          </div>
        </Link>
      ) : (
        <div className="sidebarChat">
          <IconButton>
            <AddCircleIcon onClick={handleToggle} />
          </IconButton>
          <h3>Add New Chat</h3>
        </div>
      )}
    </Fragment>
  );
};

export default SidebarChat;
