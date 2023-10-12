import React from "react";

type Props = {
  name: string;
  className?: string;
  disable?: boolean;
};

function Button({ name, className, disable }: Props) {
  return (
    <button
      disabled={disable}
      className={`${className} rounded-lg relative border-2 border-black bg-transparent py-2.5 px-5 font-medium uppercase text-black transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-orange-200 before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100 hover:border-white`}
    >
      {name}
    </button>
  );
}

export default Button;
