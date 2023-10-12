import Link from "next/link";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="flex items-center justify-between w-full p-8 bg-gray-100">
      <div className="text-xl">
        <Link href={"/"}>Front-end Test</Link>
      </div>
      <nav>
        <NavbarDesktop />
        <NavbarMobile />
      </nav>
    </div>
  );
};

export default Navbar;
