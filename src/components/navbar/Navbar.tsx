import Link from "next/link";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between w-full p-8 bg-gray-100">
      <Link href={"/"}>
        <div className="flex items-center text-xl">
          <Image src={"/logo.png"} alt="logo" width={50} height={50} />
          <span className="hidden md:block md:pl-4">Front-end Test</span>
        </div>
      </Link>
      <nav>
        <NavbarDesktop />
        <NavbarMobile />
      </nav>
    </header>
  );
};

export default Navbar;
