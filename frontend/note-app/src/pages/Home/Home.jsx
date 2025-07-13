import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import NodataImg from '../../assets/NoData.jpg'
import  AddNoteImg from '../../assets/Empty2.svg'
const Home = () => {
  const navigate = useNavigate();
  const [showToastMsg,setShowToastMsg] =useState({
    isShown:false,
    message:"",
    type:"add",
  })
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [isSearch,setIsSearch]=useState(false);


    useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  const handleEdit=async(noteDetails) => {
      setOpenAddEditModal({isShown: true,data: noteDetails,type:"edit"});z
  }

 const showToastMessage=async(message,type)=>{
    setShowToastMsg({
      isShown:true,
      message,
      type,

      
    })
  }

  const handleCloseToast=async()=>{
    setShowToastMsg({
      isShown:false,
      message:"",

    })
  }
  // GET USER_INFO
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.this.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // GET All Notes
  // Finding Big bug in this page still didn't get
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("unexpected error occurred:  PLease try Again");
    }
  };

  // delete Note
  const deleteNote=async(data)=>{
    const noteId=data._id;
     try {
      const response=await axiosInstance.delete("/delete-note/"+noteId)   
      console.log(response);
               
      if(response.data&& !response.data.error){ 
        showToastMessage("Note Deleted Successfully","delete")     
        getAllNotes()
      }
    } catch (error) {
      if(error.response && 
        error.response.data &&
        error.response.data.message
      ){
      console.log("unexpected error occurred:  PLease try Again");
      }
    }
  }

  const updateIsPinned=async(noteData)=>{
     const noteId=noteData._id;   
    try {
        const response=await axiosInstance.put("/update-note-pinned/"+noteId,{
        isPinned:!noteData.isPinned
      })   
      // console.log(response);
               
      if(response.data&& response.data.note){ 
        showToastMessage(`${noteData.isPinned? "Note Pinned Successfully":"Notes Unpinned Successfully"}`)     
        getAllNotes()
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  // search for a Notes
  const onSearchNotes=async(query)=>{
    try {
      const response=await axiosInstance.get("/search-notes",{
        params:{query},
      })
      if(response.data && response.data.notes){
        setIsSearch(true);
        setAllNotes(response.data.notes)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClearSearch=()=>{
    setIsSearch(false)
    getAllNotes()
  }

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNotes={onSearchNotes} handleClearSearch={handleClearSearch}/>

      <div className="container mx-auto">

      {allNotes.length>0?
        <div className="grid  grid-cols-3  gap-4 mt-8 mx-3">
          {allNotes.map((item,index)=>(
          <NoteCard
           key={item._id}
            title={item.title}
            date={moment(item.createdOn).format('Do MMM YYYY')}
            content={item.content}
            tags={item.tags}
            isPinned={item.isPinned}
            onEdit={() => handleEdit(item)}
            onDelete={() => deleteNote(item)}
            onPinNote={() => updateIsPinned(item) }
          />
          ))}

         
        </div>:
        <EmptyCard imgSrc={isSearch?NodataImg:AddNoteImg} 
        message={isSearch?"Oops! No notes found ":"Start creating your first Note! click the 'Add' button to noteDown your thoughts, ideas , and remainders. Let's get Started"}/>
        }
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({
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
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>
      <Toast
      isShown={showToastMsg.isShown}
      message={showToastMsg.message}
      type={showToastMsg.type}
      onClose={handleCloseToast} / >
    </>
  );
};

export default Home;
