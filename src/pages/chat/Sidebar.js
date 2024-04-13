import React, { useContext } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import { Avatar } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import db, { auth } from "./firebase";
import { useState } from "react";
import { useEffect } from "react";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const { user } = useContext(Context);
  const [channels, setChannels] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const [dropDown2, setDropDown2] = useState(false);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });
  }, []);

  const handleAddChannel = (e) => {
    e.preventDefault();

    const channelName = prompt("Enter a new channel name");

    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };

  const toggleDropdown = () => {
    setDropDown(!dropDown);
  };
  
  const toggleDropdown2 = () => {
    setDropDown2(!dropDown2);
  };

  return (
    <div className="sidebar__second">
      <div className="sidebar__top">
        <h3>Career Connect</h3>
        <ExpandMoreIcon onClick={toggleDropdown} />
      </div>

      <div className="sidebar__channels">
        {dropDown && (
          <>
            <div className="sidebar__channelsHeader">
              <div className="sidebar__header">
                <ExpandMoreIcon onClick={toggleDropdown2}/>
                <h4>Text Channels</h4>
              </div>

              {user.username === "Gyanesh" && (
                <AddIcon
                  onClick={handleAddChannel}
                  className="sidebar__addChannel"
                />
              )}
            </div>
            {dropDown2 && <div className="sidebar__channelsList">
              {channels.map(({ id, channel }) => (
                <SidebarChannel
                  key={id}
                  id={id}
                  channelName={channel.channelName}
                />
              ))}
            </div>}
          </>
        )}
      </div>

      {/* <div className="sidebar__voice">
                <SignalCellularAltIcon className='sidebar__voiceIcons' fontSize='large' />
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>

                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon />
                    <CallIcon />
                </div>
            </div> */}

      <div className="sidebar__profile">
        <Avatar onClick={() => auth.signOut()} />
        <div className="sidebar__profileInfo">
          <h3>{user.username}</h3>
          {/* <p>#{user.uid.substring(0, 5)}</p> */}
        </div>

        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
