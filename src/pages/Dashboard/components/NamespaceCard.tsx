import Card from 'components/Card/Card';
import { Link } from 'react-router-dom';

interface NamespaceCardProps {
  id: string;
  namespace: string;
  active: boolean;
  environment: string;
  onClick?: () => void;
  onHover?: string;
}

const NamespaceCard = ({
  id,
  namespace,
  active,
  environment,
  onHover,
}: NamespaceCardProps) => {
  return (
    <Link to={`/namespace/${id}`}>
      <Card
        key={id}
        body={
          <ul className="grid grid-cols-3 gap-2 w-full justify-items-stretch text-xs">
            <li className="justify-self-center text-center">{namespace}</li>
            <li className="justify-self-center text-center">{environment}</li>
            <li className="justify-self-center text-center">
              {active ? 'Active' : 'Inactive'}
            </li>
          </ul>
        }
        bodyClassName="flex flex-row w-full justify-center"
        containerClassName={`border border-grey-500 w-4/5 flex py-5 my-3 bg-white hover:bg-secondary cursor-pointer ${
          onHover ? onHover : ''
        }`}
      />
    </Link>
  );
};

export default NamespaceCard;
