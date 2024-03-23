import React, { useState, useEffect } from "react";
import {  AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import { state } from "../store";
import config from "../config/config";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { download } from "../assets";
import { DecalTypes, EditorTabs, FilterTabs } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { AiPicker, ColorPicker, CustomButton, FilePicker, Tab } from "../components";




const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  function download(params) {
    console.log("Download");
  }

  function generateTabContent() {
    console.log(activeEditorTab)
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />

      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />

      case "aipicker":
        return <AiPicker />
    
      default:
        return '';
    }
  }

  function handleTabClick(e, params) {
    console.log("Handle Click ", params, state.activeTab);

    if (state.activeTab === params.name) {
      state.activeTab = "";
      setActiveEditorTab(``);
    } else {
      state.activeTab = params.name;
      setActiveEditorTab(params.name);
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.stateProperty]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        // state.isFullTexture = false;
        break;
      case "stylishShirt":
        // state.isLogoTexture = false;
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }
  }

  function readFile(type) {
    if (!file) return;
    console.log(file)

    const firstReader = new FileReader();

      firstReader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          const width = img.width;
          const height = img.height;
    
          // Check if image is square (within some tolerance)
          const isSquare = Math.abs(width - height) < 400;
    
          if (isSquare) {
            console.log('Image is square.');
            reader(file).then((result) => {
              handleDecals(type, result);
              setActiveFilterTab('');
            });
          } else {
            alert('Image is not square. Please select a square image.');
            console.log('Image is not square.');
          }
    
          console.log('Width:', width);
          console.log('Height:', height);
        };
        img.src = event.target.result;
      };
    
      firstReader.readAsDataURL(file);
  }

  return (
    <>
      { !snap.intro && (
        <AnimatePresence mode="wait">
          <motion.div key={Date.now()+2} className="absolute top-0 left-0 z-10" {...slideAnimation("left")}>
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab, i) => (
                  <Tab key={`${i}+${state.activeTab}`} tab={tab} handleClick={(e) => handleTabClick(e, tab)} />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div key={Date.now()+3} className="absolute z-10 top-5 right-5" {...fadeAnimation}>
            <CustomButton type="filled" title="Go Back" handleClick={() => state.intro = true} customStyles="w-fit px-4 py-2.5 font-bold text-sm" />
          </motion.div>

          {/* <motion.div key={Date.now()+4} className="filtertabs-container" {...slideAnimation("bottom")}>
            {FilterTabs.map((tab, i) => (
              <Tab key={i} tab={tab} isFilterTab activeTab="" handleClick={handleTabClick} />
            ))}
          </motion.div> */}
        </AnimatePresence>
      )}
    </>
  );
};

export default Customizer;
