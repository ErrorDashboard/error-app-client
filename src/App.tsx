import CurrentUserProvider from 'global/context/currentUserContextProvider';
import ClientRoutes from 'routes';

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="w-full h-full">
        <CurrentUserProvider>
          <ClientRoutes />
        </CurrentUserProvider>
      </div>
    </div>
  );
};

export default App;
