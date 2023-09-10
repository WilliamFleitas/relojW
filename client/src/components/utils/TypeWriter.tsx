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
      
      currentIndex++;
      setVisibleText((prevText) => prevText + text[currentIndex]);
      if (currentIndex === text.length) {
        clearInterval(interval);
      }
    }, 60); // Intervalo de tiempo entre cada letra (ajusta según tus necesidades)

    return () => {
      clearInterval(interval);
    };
  }, [text]);

  return <div style={{  height: "100%", overflow: "hidden" }} className="typewriter min-w-screen">{visibleText}</div>;
};

