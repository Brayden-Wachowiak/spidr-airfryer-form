import React, { useState } from "react";
import "./Tooltip.css";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={0}
      aria-describedby="tooltip-content"
    >
      {children}
      {visible && (
        <div className="tooltip-box" role="tooltip" id="tooltip-content">
          {content}
          <div className="tooltip-arrow" />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
