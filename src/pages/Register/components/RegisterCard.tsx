import Card from 'components/Card/Card';
import { RegisterForm } from './RegisterForm';

const RegisterCard = () => {
  return (
    <Card
      body={<RegisterForm />}
      bodyClassName="w-full my-[30px]"
      containerClassName={
        'flex flex-col min-w-[450px] justify-center bg-white border-2 border-green-800 shadow-2xl rounded-md items-center text-center mt-20 overflow-hidden'
      }
      header={<h1 className="text-4xl py-5">Register!</h1>}
    />
  );
};

export default RegisterCard;
