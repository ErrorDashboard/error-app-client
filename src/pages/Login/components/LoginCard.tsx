import githubIcon from 'assets/images/github16.png';
import googleIcon from 'assets/images/google16.png';
import Card from 'components/Card/Card';
import { VITE_BASE_API_URL } from 'configs';
import { Link } from 'react-router-dom';
import { LoginForm } from './LoginForm';

const handleGoogleLogin = () => {
  window.location.href = `http://${VITE_BASE_API_URL}/v1/auth/google`;
};

const handleGithubLogin = () => {
  window.location.href = `http://${VITE_BASE_API_URL}/v1/auth/github`;
};

const LoginCard = () => {
  return (
    <Card
      body={<LoginForm />}
      bodyClassName="w-full"
      containerClassName="flex flex-col min-w-[450px] justify-center bg-white border-2 border-green-800 shadow-2xl rounded-md items-center text-center mt-20 overflow-hidden"
      footer={
        <ul className="min-w-full flex flex-col justify-center items-center text-center py-[30px]">
          <Link className="w-full btn-primary mt-2" to="/register">
            Register
          </Link>
          <button
            className="min-w-full btn justify-center mt-2"
            onClick={handleGoogleLogin}
          >
            <img src={googleIcon} className="w-[20px] h-[20px]" />
            Login with Google
          </button>
          <button
            className="min-w-full btn justify-center my-2"
            onClick={handleGithubLogin}
          >
            <img src={githubIcon} className="w-[20px] h-[20px]" />
            Login with Github
          </button>
        </ul>
      }
      footerClassName="w-full"
      header={<h1 className="text-4xl py-5">Login!</h1>}
    />
  );
};

export default LoginCard;
