import React, { useState, useEffect } from "react";
import "./posts.css";
import Post from "../post/Post";
import axios from "axios";

export default function Posts() {
  const [options, setOptions] = useState([]);
  const [posts, setPosts] = useState([]);
  const [option, setOption] = useState("All");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`http://localhost:7000/api/post/get/${option}`);
      // console.log(res);

      setPosts(res.data);
    };
    fetchPosts();
    console.log("option changed");
  }, [option]);

  useEffect(() => {
    fetch('http://localhost:7000/api/post/titles')
      .then((response) => response.json())
      .then((data) => setOptions(data))
      .catch((error) => console.error('Error fetching options:', error));
  }, []);

  return (
    <div className="post-section" style={{display: "flex", flexDirection: 'column', marginTop: "5vh", width:"65%"}}>
      <select style={{width: "50%", marginLeft: "auto", marginRight: "auto"}} onChange={(e) => {setOption(e.target.value); console.log('hrllo');}}>
        <option>All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="posts" style={{display: 'flex'}}>
        {posts.map((p) => (
          <Post key={p.id} post={p} option={option}/>
          ))}
          </div>
      </div>
  );
}
