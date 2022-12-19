import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Avatar } from "@mui/material";
import SidebarChat from "./SidebarChat";
import db from "../../firebaseFile";
import { useStateValue } from "../../StateProvider";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{user}, dispatch]= useStateValue();

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, [rooms]);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_header_left">
          <IconButton>
            <Avatar src={user ?.photoURL}/>
          </IconButton>
        </div>
        <div className="sidebar_header_right">
          <IconButton>
            <DataUsageIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_search_container">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input type="text" placeholder="Search or start new chat " />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat addNewChat={true}/>
        {rooms.map((room) => (
          <SidebarChat key={room.id} name={room.data.name} id={room.id} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
