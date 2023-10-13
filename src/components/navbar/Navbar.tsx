import Link from "next/link";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between w-full p-8 bg-gray-100">
      <div className="text-xl">
        <Link href={"/"}>Front-end Test</Link>
      </div>
      <nav>
        <NavbarDesktop />
        <NavbarMobile />
      </nav>
    </header>
  );
};

export default Navbar;
