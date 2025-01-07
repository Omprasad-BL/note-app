import React from "react";
import Navbar from "../../components/navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
      <div className="grid  grid-cols-3  gap-4 mt-8">
        <NoteCard
          title="Meeting today"
          date="6 jab 26"
          content="meeting on 7th jan  "
          tags="#meeting  "
          isPinned={true}
          onEdit={()=>{}}
          onDelete={()=>{}}
          onPinNote={()=>{}}
        />

<NoteCard
          title="Meeting today"
          date="6 jab 26"
          content="meeting on 7th jan  "
          tags="#meeting  "
          isPinned={true}
          onEdit={()=>{}}
          onDelete={()=>{}}
          onPinNote={()=>{}}
        />

<NoteCard
          title="Meeting today"
          date="6 jab 26"
          content="meeting on 7th jan  "
          tags="#meeting  "
          isPinned={true}
          onEdit={()=>{}}
          onDelete={()=>{}}
          onPinNote={()=>{}}
        />
      </div>
      </div>
      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10">
        <MdAdd className="text-[32px] text-white "/>
      </button>
      <AddEditNote/>
    </>
  );
};

export default Home;
