import React from "react";
import { NavLink } from "react-router-dom";

const linkStyle = 'p-2 hover:border-b-4 hover:border-[#B35642]   cursor-pointer  duration-300';

const HorizontalNav = () => {

  
  return (
    <ul className="hidden md:flex md:items-center w-9/12 justify-around max-w-[600px]">
     
      <li>
        <NavLink to="/" className={linkStyle}>
          Habitaciones
        </NavLink>
      </li>
      {/* <li>
        <NavLink to="/" className={linkStyle}>
          Galeria
        </NavLink>
      </li>
      <li>
       <a draggable="false" className={linkStyle} href="">Contacto</a>
      </li>
      <li>
        <NavLink to="/" className={linkStyle}>
          Sobre Nosotros
        </NavLink>
      </li> */}

    </ul>
  );
};

export default HorizontalNav;
