import React, { useState } from "react";
import TagInput from "../../components/input/TagInput";
import { MdClose } from "react-icons/md";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNote = ({ noteData, type,getAllNotes, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      const response=await axiosInstance.post("/add-note",{
        title,
        content,
        tags
      })

      if(response.data&& response.data.notes){
        getAllNotes()
        onClose()
      }
    } catch (error) {
      if(error.response && 
        error.response.data &&
        error.response.data.message
      ){
        setError(error.response.data.message)
      }
    }
  };
  const editNote = async () => {};
  const handleAddNote = async () => {
    if (!title) {
      setError("Title is required");

      return;
    }
    if (!content) {
      setError("Content is required");
      return;
    }
    setError("");
    if (type == "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
      >
        <MdClose className="text-xl text-slate-400 " />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label" htmlFor="">
          Title
        </label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go To Gym At 5"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="input-label" htmlFor="">
          CONTENT
        </label>
        <textarea
          type="text"
          className="text-sm bg-slate-50 text-slate-950 outline-none p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label htmlFor="" className="input-label">
          TAGS
        </label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
      <button
        className="btn-primary font-medium mt-5 p-3 "
        onClick={handleAddNote}
      >
        Add
      </button>
    </div>
  );
};

export default AddEditNote;
