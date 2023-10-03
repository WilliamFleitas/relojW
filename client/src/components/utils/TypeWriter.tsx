import  { useEffect, useState } from "react";
import "../../index.css";
interface TypeWriterTypeProps {
    text:string;
}
export const Typewriter = ({ text }: TypeWriterTypeProps) => {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    setVisibleText("");
    let currentIndex = 0;
    const interval = setInterval(() => {
      
      currentIndex++;
      setVisibleText((prevText) => prevText + text[currentIndex -1] );
      if (currentIndex  === text.length) {
        clearInterval(interval);
      }
    }, 60); 

    return () => {
      clearInterval(interval);
      setVisibleText("");
    };
  }, [text]);
  return <div style={{  height: "100%", overflow: "hidden" }} className="typewriter min-w-screen">{visibleText}</div>;
};

