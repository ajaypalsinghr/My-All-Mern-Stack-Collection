import React, { useState } from 'react';

const Admin = ({ menu, setMenu }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
const [edit,setEdit]=useState(null)

  const handleAddItem = (e) => {
    e.preventDefault();

  
    // 1. Validation (Khali na ho)
    if (!name || !price) return alert("Bhai, naam aur price dono dalo!");

    if(edit)
    {
      const updatemenu=menu.map(item=>
        item.id===edit?{...item,name,price:parseFloat(price)}:item
      )
      setMenu(updatemenu)
      setEdit(null)
        setName("")
        setPrice("")
    }
    else{
      
    
    const isExist = menu.find(item => item.name.toLowerCase().trim() === name.toLowerCase().trim());
    if (isExist) return alert("Ye item pehle se menu mein hai!");

    // 3. Max ID + 1 Logic
    const maxId = menu.length > 0 ? Math.max(...menu.map(item => item.id)) : 0;

    const newItem = {
      id: maxId + 1,
      name: name.trim(),
      price: parseFloat(price)
    };

    // 4. Update State
    setMenu([...menu, newItem]);
    setName('');
    setPrice('');
  }
  };
  const itemRemove=(id)=>{

const listItem=menu.filter((item)=>{
  return item.id!==id
})
setMenu(listItem)
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Inventory</h2>
      
      {/* Add Item Form */}
      <form onSubmit={handleAddItem} className="flex flex-col md:flex-row gap-4 mb-8">
        <input 
          type="text" 
          placeholder="Item Name (e.g. Samosa)" 
          className="border p-2 rounded flex-1 focus:outline-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="Price" 
          className="border p-2 rounded w-32 focus:outline-blue-500"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition font-semibold">
          {edit?"update Item":"add item"}
        </button>
      </form>

      {/* Item List Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Price</th>
               <th className="p-3 border">Remove Button</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item,index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-3 border">{index+1}</td>
                <td className="p-3 border font-medium">{item.name}</td>
                <td className="p-3 border">₹{item.price}</td>
                  <td className="p-3 border"><button onClick={()=>itemRemove(item.id)} className='bg-red-600 p-2 rounded-2xl text-white'>Remove</button></td>
                   <td className="p-3 border"><button onClick={()=>setEdit(item.id)} className='bg-red-600 p-2 rounded-2xl text-white'>ChangePrice</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;