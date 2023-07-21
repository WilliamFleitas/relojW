import React, { useEffect, useState } from "react";
import "../../index.css"; // Archivo CSS para el efecto de escritura

interface TypeWriterTypeProps {
    text:string;
}
export const Typewriter = ({ text }: TypeWriterTypeProps) => {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setVisibleText((prevText) => prevText + text[currentIndex]);
      currentIndex++;
      if (currentIndex === text.length) {
        clearInterval(interval);
      }
    }, 100); // Intervalo de tiempo entre cada letra (ajusta según tus necesidades)

    return () => {
      clearInterval(interval);
    };
  }, [text]);

  return <div style={{  height: "200px", overflow: "hidden" }} className="typewriter ">{visibleText}</div>;
};

