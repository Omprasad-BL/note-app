import React from "react";
import {MdOutLInePushPin} from 'react-icons/md'
const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return <div className="">
  <div>
    {/* <div> */}
        {/* <h6>{title}</h6> */}
        {/* <span>{date}</span> */}

    {/* </div> */}
    {/* <MdOutLInePushPin className="" onclick={onPinNote} /> */}
  </div>
  </div>;
};

export default NoteCard;
