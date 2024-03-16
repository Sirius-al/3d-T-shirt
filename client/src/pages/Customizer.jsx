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

  function download(params) {
    console.log("Download");
  }

  function handleTabClick(params) {
    console.log("Handle Click ", params);
  }

  return (
    <>
      { !snap.intro && (
        <AnimatePresence mode="wait">
          <motion.div key={Date.now()+2} className="absolute top-0 left-0 z-10" {...slideAnimation("left")}>
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab, i) => (
                  <Tab key={i} tab={tab} handleClick={handleTabClick} />
                ))}
              </div>

            </div>
          </motion.div>

          <motion.div key={Date.now()+3} className="absolute z-10 top-5 right-5" {...fadeAnimation}>
            <CustomButton type="filled" title="Go Back" handleClick={() => state.intro = true} customStyles="w-fit px-4 py-2.5 font-bold text-sm" />
          </motion.div>

          <motion.div key={Date.now()+4} className="filtertabs-container" {...slideAnimation("bottom")}>
            {FilterTabs.map((tab, i) => (
              <Tab key={i} tab={tab} isFilterTab activeTab="" handleClick={handleTabClick} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default Customizer;
