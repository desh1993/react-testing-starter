import OrderStatusSelector from "../components/OrderStatusSelector";

const PlaygroundPage = () => {
  const onChange = (status: string) => {
    console.log(status);
  };
  return (
    <>
      <OrderStatusSelector onChange={onChange} />
    </>
  );
};

export default PlaygroundPage;
