import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Data receive karna (jo Billing page se bheja tha)
  const { billItems, total } = location.state || { billItems: [], total: 0 };

  const handlePrint = () => {
    window.print(); // Browser ka default print function
  };
  if (billItems.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold">Koi data nahi mila bhai!</h2>
        <button onClick={() => navigate('/billing')} className="mt-4 text-blue-600 underline">Wapas Billing par jao</button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 shadow-2xl border border-gray-200 mt-10 rounded-sm" id="printable-area">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-black uppercase">MY HOTEL</h1>
        <p className="text-sm text-gray-600">Bhopal, MP | Contact: +91 9876543210</p>
        <p className="text-xs mt-1 text-gray-500 italic">Bill No: #INV-{Math.floor(Math.random() * 10000)}</p>
      </div>

      {/* Table Header */}
      <div className="flex justify-between font-bold border-b pb-2 mb-2 text-sm">
        <span className="w-1/2">Item Name</span>
        <span className="w-1/4 text-center">Qty</span>
        <span className="w-1/4 text-right">Total</span>
      </div>

      {/* Bill Items */}
      <div className="space-y-3 min-h-[200px]">
        {billItems.map((item, index) => (
          <div key={index} className="flex justify-between text-sm border-b border-dashed pb-2">
            <span className="w-1/2 font-medium">{item.name}</span>
            <span className="w-1/4 text-center">x{item.qty}</span>
            <span className="w-1/4 text-right">₹{item.price * item.qty}</span>
          </div>
        ))}
      </div>

      {/* Grand Total */}
      <div className="mt-6 border-t-2 border-gray-800 pt-4">
        <div className="flex justify-between text-xl font-black">
          <span>GRAND TOTAL:</span>
          <span>₹{total}</span>
        </div>
        <p className="text-[10px] mt-4 text-center text-gray-500 uppercase tracking-widest">Thank you for visiting! Come again.</p>
      </div>

      {/* Control Buttons (Hide during Print) */}
      <div className="mt-10 flex gap-4 print:hidden">
        <button 
          onClick={handlePrint}
          className="flex-1 bg-black text-white py-2 rounded font-bold hover:bg-gray-800 transition"
        >
          Print Bill
        </button>
        <button 
          onClick={() => navigate('/billing')}
          className="flex-1 border border-black py-2 rounded font-bold hover:bg-gray-100 transition"
        >
          New Bill
        </button>
      </div>
    </div>
  );
};
export default Invoice;