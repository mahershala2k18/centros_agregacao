import React, { useRef } from "react";

const Scroll = () => {
  const scollToRef = useRef();

  const handleClick = () => {
    scollToRef.current.scrollIntoView();

    console.log(scollToRef.current);
  };
  return (
    <div className="container">
      <button onClick={handleClick}>Scroll</button>
      <div ref={scollToRef}>You scrolled to me</div>
    </div>
  );
};

export default Scroll;
