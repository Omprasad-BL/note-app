import React from "react";

const AddEditNote = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label className="input-label" htmlFor="">
          Title
        </label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go To Gym At 5"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="input-label" htmlFor="">
          CONTENT
        </label>
        <textarea
          type="text"
          className="text-sm  text-slate-950 outline-none p-2 rounded"
          placeholder="Content"
          rows={10}
        />
      </div>

      <div className="mt-3">
        <label htmlFor="" className="input-label">
          TAGS
        </label>
      </div>
    </div>
  );
};

export default AddEditNote;
