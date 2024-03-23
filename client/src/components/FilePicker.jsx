import React from "react";
import CustomButton from "./CustomButton";


const FilePicker = ({ file, setFile, readFile }) => {


  return (
    <div className={`absolute left-full ml-3 transition-all ease-in-out filepicker-container`}>
    <div className="flex-1 flex flex-col">

      <input
        id="file-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => setFile(e.target.files[e.target.files.length - 1])}
      />
      <label htmlFor="file-upload" className="filepicker-label">Upload File</label>
      <p className="mt-2 text-gray-500 text-xs truncate">{ file ? file?.name : "No file selected" }</p>
    </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <CustomButton
          type="filled"
          title="Logo"
          handleClick={() => readFile("logo")}
          customStyles="text-xs"
        />
      </div>
    </div>
  );
};

export default FilePicker;
