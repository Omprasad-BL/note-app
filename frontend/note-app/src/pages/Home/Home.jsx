import React from "react";
import Navbar from "../../components/navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";

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
    </>
  );
};

export default Home;
