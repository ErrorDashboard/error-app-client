import { useCurrentUserContext } from 'global/context/currentUserContextProvider';

const Home = () => {
  const { currentUserData } = useCurrentUserContext();

  return (
    <div>
      <h1>Welcome</h1>
      {currentUserData && <h2>Hello {currentUserData._id}</h2>}
    </div>
  );
};

export default Home;
