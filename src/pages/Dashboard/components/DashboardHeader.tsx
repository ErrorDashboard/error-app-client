import Card from 'components/Card/Card';

const DashboardHeader = () => {
  return (
    <Card
      body={<h1 className="text-2xl">Overview</h1>}
      bodyClassName="flex flex-col justify-center"
      containerClassName="flex flex-col w-4/5 min-h-[200px] bg-white justify-center text-center border-b border-secondary"
      footer={
        <ul className="w-4/5 flex flex-row justify-between items-center">
          <li>Namespace</li>
          <li>Environment</li>
          <li>Active</li>
        </ul>
      }
      footerClassName="w-full pt-10 flex justify-center mt-12"
    />
  );
};

export default DashboardHeader;
