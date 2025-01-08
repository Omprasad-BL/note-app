import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
const Home = () => {
  const [openAddEditModal, setOpenEditionModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
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
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />

          <NoteCard
            title="Meeting today"
            date="6 jab 26"
            content="meeting on 7th jan  "
            tags="#meeting  "
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />

          <NoteCard
            title="Meeting today"
            date="6 jab 26"
            content="meeting on 7th jan  "
            tags="#meeting  "
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenEditionModal({
            isShown: true,
            type: "add",
            data: null,
          });
        }}
      >
        <MdAdd className="text-[32px] text-white " />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNote />
      </Modal>
    </>
  );
};

export default Home;
