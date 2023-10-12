import React from "react";

interface MenuProps {
  className: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}
const BurgerMenu = ({ className, setIsOpen, isOpen }: MenuProps) => {
  return (
    <button
      className={`flex flex-col h-12 w-12  rounded justify-center items-center group bg-slate-300 ${className}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`${style.genericHamburgerLine} ${
          isOpen
            ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${style.genericHamburgerLine} ${
          isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${style.genericHamburgerLine} ${
          isOpen
            ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
    </button>
  );
};

export default BurgerMenu;

const style = {
  genericHamburgerLine: `h-1 w-8 my-1 rounded-full bg-white transition ease transform duration-300`,
};
