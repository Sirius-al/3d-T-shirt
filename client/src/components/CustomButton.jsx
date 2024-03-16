import React from "react";
import { useSnapshot } from "valtio";
import { state } from "../store";



const CustomButton = ({ type, title, handleClick, customStyles }) => {
    const snap = useSnapshot(state);


    function genStyles(type) {
        
        switch (type) {
            case 'filled':
                return {
                    backgroundColor: snap.color,
                    color: '#fff',
                };
        
            default:
                return {};
        }

    }


  return (
    <button
        type="button"
        className={`px-4 py-1.5 flex-1 rounded-md ${customStyles}`}
        style={genStyles(type)}
        onClick={handleClick}
        >
        {title}
    </button>
  )
};

export default CustomButton;
