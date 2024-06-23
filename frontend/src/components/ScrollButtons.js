import * as React from "react";
import { ChevronLeftRegular, ChevronRightRegular } from "@mui/icons-material";

const ScrollButtons = ({ onScroll }) => {
  return (
    <div
      className="d-flex align-items-center mt-5"
      style={{ cursor: "pointer" }}
    >
      <ChevronLeftRegular fontSize={20} onClick={() => onScroll(-50)} />
      <ChevronRightRegular fontSize={20} onClick={() => onScroll(50)} />
    </div>
  );
};

export default ScrollButtons;
