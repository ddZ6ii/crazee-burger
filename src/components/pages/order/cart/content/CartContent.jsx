import Message from '../../../../common/Message';

export default function CartContent({ className }) {
  const isCartEmpty = true;

  if (isCartEmpty)
    return <Message message="Your order is empty" className={className} />;

  return <div>CartContent</div>;
}
