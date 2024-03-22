import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { RiArrowRightDoubleLine } from "react-icons/ri";

const SwipeButton = ({ onSwipe, buttonText, buttonBg, isLoading }) => {
  const [startX, setStartX] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [arrowOffset, setArrowOffset] = useState(0);
  const [buttonWidth, setButtonWidth] = useState(0);

  const handleStart = (clientX) => {
    setStartX(clientX);
    setIsSwiping(true);
  };

  const handleMove = (clientX) => {
    if (startX && isSwiping) {
      const deltaX = clientX - startX;
      // Update the arrow offset based on swipe distance (limited to the button width)
      setArrowOffset(Math.min(deltaX, buttonWidth)); // Adjust maximum offset to button width
    }
  };

  const handleEnd = () => {
    if (startX && isSwiping) {
      if (Math.abs(arrowOffset) > buttonWidth / 2) {
        onSwipe(arrowOffset > 0 ? "right" : "left");
      }
    }
    setStartX(null);
    setIsSwiping(false);
    setArrowOffset(0); // Reset arrow offset
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      handleStart(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent text selection
    handleStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleButtonRef = (node) => {
    if (node !== null) {
      setButtonWidth(node.offsetWidth);
    }
  };

  return (
    <button
      ref={handleButtonRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchCancel={() => {
        setStartX(null);
        setIsSwiping(false);
        setArrowOffset(0); // Reset arrow offset on touch cancel
      }}
      disabled={isLoading}
      className={`relative ${buttonBg} text-white font-bold py-3 px-4 rounded-lg w-full animate-pulse border-none`}
      style={{ paddingLeft: "40px" }} // Adjust padding to accommodate the arrow
    >
      {!isLoading && (
        <>
          <span
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            style={{
              left: `${arrowOffset}px`,
              transition: "left 0.2s ease-in-out",
            }}
          >
            <RiArrowRightDoubleLine size={26} color="white" />
          </span>
          {buttonText}
        </>
      )}

      {isLoading && (
        <ImSpinner2 size={22} color="white" className="animate-spin" />
      )}
    </button>
  );
};

export default SwipeButton;
