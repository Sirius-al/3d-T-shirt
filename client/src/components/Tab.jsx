import React, { useEffect } from "react";
import { useSnapshot } from 'valtio';
import { state } from '../store';

const Tabs = (props) => {
  const { tab, handleClick, isActiveTab } = props;

  const snap = useSnapshot(state);
  
  return (
  <div onClick={() => handleClick(tab)}
  className={[`cursor-pointer tab ${state.activeTab == tab.name ? 'rounded-xl glassmorphism' : 'rounded'}`]}
  >
      <img src={tab.icon} alt={tab.name} />
  </div>
  );
};

export default Tabs;
