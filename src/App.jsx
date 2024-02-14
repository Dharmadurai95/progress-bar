
import './App.css'
import CheckOut from './CheckOut'

function App() {
  const checkoutSteps = [
    {
      name: "Customer Info",
      Component: <div>Provide your contact info</div>
    },
    {
      name: "Shipping Info",
      Component: <div>Enter your shipping address</div>
    },
    {
      name: "Payment",
      Component: <div>Complete for you payment order</div>
    },
    {
      name: "Delivered",
      Component: <div>Your order has been delivered</div>
    }
  ]

  return (
    <div>
      <h2>Checkout</h2>
      <CheckOut stepConfig={checkoutSteps} />
    </div>
  )
}

export default App
