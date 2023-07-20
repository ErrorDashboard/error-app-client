import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  EllipsisVerticalIcon,
  HomeIcon,
} from '@heroicons/react/20/solid';
import { VITE_BASE_API_URL } from 'configs';
import { useCurrentUserContext } from 'global/context/currentUserContextProvider';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { currentUserData, accessToken, setCurrentUserData, setAccessToken } =
    useCurrentUserContext();
  const [hamburgerOpen, setHamburgerOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await fetch(`http://${VITE_BASE_API_URL}/logout`, {
        body: JSON.stringify(currentUserData),
        credentials: 'include',
        headers: {
          Authorization: `${accessToken?.token}`,
        },
        method: 'POST',
      });
      setCurrentUserData(null);
      setAccessToken(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBurgerOpen = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  return (
    <nav className="w-full flex flex-row justify-between border-b border-primary bg-white">
      <Link
        className="flex flex-row text-[28px] text-center justify-center items-center ml-10 my-5"
        to="/"
      >
        <img src="./src/assets/images/micro64.png" />
        <h1 className="mx-10">Error Dashboard</h1>
      </Link>
      <ul
        className={`${
          hamburgerOpen ? 'block' : 'hidden'
        } sm:flex h-[30px] self-center mr-5`}
      >
        <li>
          <Link to="/">
            <HomeIcon title="Home" className="h-8 w-8 hover:text-primary" />
          </Link>
        </li>
        {!accessToken ? (
          <>
            <li>
              <Link to="/login">
                <ArrowRightOnRectangleIcon
                  title="Login"
                  className="h-8 w-8 hover:text-primary"
                />
              </Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <li className="error">
            <button onClick={handleLogout}>
              <ArrowLeftOnRectangleIcon
                title="Logout"
                className="h-8 w-8 hover:text-red-500"
              />
            </button>
          </li>
        )}
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
