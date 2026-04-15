import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Billing = ({ menu }) => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Cart mein item add karne ka logic (Wahi logic jo humne shuru mein seekha tha!)
  const addToCart = (product) => {
    const isExist = cart.find((item) => item.id === product.id);

    if (isExist) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };
  
  // Grand Total calculate karna (useMemo performance ke liye achha hai)
  const totalAmount = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  }, [cart]);

  // Invoice page par data lekar jana
  const handleCheckout = () => {
    if (cart.length === 0) return alert("Cart khali hai bhai!");
    navigate('/invoice', { state: { billItems: cart, total: totalAmount } });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* Left Side: Hotel Menu */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 border-b pb-2 text-blue-600">Hotel Menu</h2>
        <div className="grid grid-cols-1 gap-3">
          {menu.map((item) => (
            <button 
              key={item.id} 
              onClick={() => addToCart(item)}
              className="flex justify-between items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition"
            >
              <span className="font-medium text-gray-700">{item.name}</span>
              <span className="text-green-600 font-bold">₹{item.price}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Side: Current Bill */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-orange-600">Customer Bill</h2>
          {cart.length === 0 ? (
            <p className="text-gray-400 italic">Koi item select nahi kiya...</p>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">₹{item.price} x {item.qty}</p>
                  </div>
                  <p className="font-bold">₹{item.price * item.qty}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total & Checkout */}
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between text-2xl font-bold text-gray-800 mb-4">
            <span>Total:</span>
            <span>₹{totalAmount}</span>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg"
          >
            Generate Invoice
          </button>
        </div>
      </div>

    </div>
  );
};

export default Billing;