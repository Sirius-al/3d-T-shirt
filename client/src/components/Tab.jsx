import React from "react";

const Tabs = (props) => {
  const { tab, handleClick } = props;
  
  return (
  <div onClick={() => handleClick(tab)}>
      {tab?.name || 'tab--'}
  </div>
  );
};

export default Tabs;
