import { useAuth } from "../../context/AuthContext";
import NavbarConnected from "./NavbarConnected";
import NavbarDisconnected from "./NavbarDisconnected";

const NavbarDesktop = () => {
  const { user } = useAuth();

  return (
    <ul className="items-center hidden md:flex">
      {user && (
        <>
          <NavbarConnected />
        </>
      )}
      {!user && (
        <>
          <NavbarDisconnected />
        </>
      )}
    </ul>
  );
};

export default NavbarDesktop;
