import React, { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
export default function Write() {
  const [title, setTitle] = useState("");
  //hum yha useRef() ka bhi use kr skte the pr hmko ye sari cheej eani chhaiye thats we are using usestate here
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [company, setCompany] = useState("");
  const { user } = useContext(Context);
  //  console.log(user.username);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    const newPost = {
      username: user.username,
      title,
      desc,
      company
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log("Error in uploading the file: " + err);
      }
    }
    try {
      const res = await axios.post("http://localhost:7000/api/post/", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <input
            type="text"
            placeholder="Enter Company Name"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
        <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div className="writeFormGroup">
          <textarea
            type="text"
            name=""
            id=""
            placeholder="Tell Your story...."
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
