"use client";

import { useEffect, useState } from "react";

interface DottedLineProps {
  fromRef: React.RefObject<HTMLDivElement | null>;
  toRef: React.RefObject<HTMLDivElement | null>;
}

const DottedLine: React.FC<DottedLineProps> = ({ fromRef, toRef }) => {
  const [lineProps, setLineProps] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  useEffect(() => {
    const updateLine = () => {
      if (fromRef.current && toRef.current) {
        const fromRect = fromRef.current.getBoundingClientRect();
        const toRect = toRef.current.getBoundingClientRect();
        const containerRect = document
          .querySelector(".relative")
          ?.getBoundingClientRect();

        if (!containerRect) return;

        setLineProps({
          x1: fromRect.left + fromRect.width / 2 - containerRect.left,
          y1: fromRect.top + fromRect.height / 2 - containerRect.top,
          x2: toRect.left + toRect.width / 2 - containerRect.left,
          y2: toRect.top + toRect.height / 2 - containerRect.top,
        });
      }
    };

    updateLine();
    window.addEventListener("resize", updateLine);
    return () => window.removeEventListener("resize", updateLine);
  }, [fromRef, toRef]);

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <line
        x1={lineProps.x1}
        y1={lineProps.y1}
        x2={lineProps.x2}
        y2={lineProps.y2}
        stroke="black"
        strokeWidth="4"
        strokeDasharray="10,10"
      />
    </svg>
  );
};

export default DottedLine;
