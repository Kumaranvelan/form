import React, { useState } from 'react';
interface Person {
  name: string;
  email: string;
  phone: number;
  website: string; 
  contact: string;
  number : number;
  another: string;
  notes : string;
  type : string[];
  category :string[];
  commission : number;
  date : string;
  logo: string;
  criticalaccount :string[];
  payment : string[];
}
const App = () => {
  const [persons, setPersons] = useState<Person[]>([])
  const [formData, setFormData] = useState<Person>({
    name: '',
    email: '',
    phone: 0,
    website: '',
    contact: '',
    number: 0,
    another: '',
    notes: '',
    type: [],
    category: [],
    commission: 0,
    date: '',
    logo: '',
    criticalaccount: [],
    payment: [],
  });
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
const AddPerson = (event: React.FormEvent) => {
    event.preventDefault();
    setPersons((prevPersons) => [...prevPersons, formData]);
    // Reset the form data after adding a person
    setFormData({
      name: '',
      email: '',
      phone: 0,
      website: '',
      contact: '',
      number: 0,
      another: '',
       notes: '',
      type: [],
      category: [],
      commission: 0,
      date: '',
      logo: '',
      criticalaccount: [],
      payment: [],
    });
  };





  console.log(persons);

  // In your App component

const handleDelete = (index: number) => {
  // Show a confirmation dialog to confirm the delete action
  const confirmDelete = window.confirm('Are you sure you want to delete this person?');

  if (confirmDelete) {
    // Create a copy of the persons array
    const updatedPersons = [...persons];

    // Remove the selected person from the copied array
    updatedPersons.splice(index, 1);

    // Update the state with the updated array
    setPersons(updatedPersons);
  }
};




   return (
    <div>
    <form id="myForm" >
    <label htmlFor="name">Name</label>
    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
    <label>Email</label>
    <input type="text" name="email" id="email" value={formData.email} onChange={handleInputChange} />
    <label>PhoneNumber</label>
    <input type="tel" name="number" id="number" value={formData.phone} onChange={handleInputChange}/>
    <label>website</label>
    <input type="text" id="website" name="website" value={formData.website} onChange={handleInputChange} />
    <label >contactname</label>
    <input type="text" id="contact" name="contact"value={formData.contact} onChange={handleInputChange}/>
    <label >contactnumber</label>
    <input type="tel" id="phone" name="phone"value={formData.number} onChange={handleInputChange} />
    <label>ContactMail</label>
    <input type="email" id="another" name="another"value={formData.another} onChange={handleInputChange}/>
    <label>Notes</label>
    <textarea name="notes" id="notes" value={formData.notes} onChange={handleInputChange}></textarea>
    <label >Type:</label>
    <label >Small buisiness</label>
    <input type="radio" name="type" id="small business" value="small business" checked={formData.type.includes('small business')} onChange={handleInputChange}/>
    <label >Entreprise</label>
    <input type="radio" name="type" id="entreprise" value="Entreprise" checked={formData.type.includes('Entreprise')} onChange={handleInputChange}/>
    <label >Entreprenuer</label>
    <input type="radio" name="type" id="entreprenuer" value="Entreprenuer" checked={formData.type.includes('Entreprenuer')} onChange={handleInputChange}/>
    <label > category</label>
    <select name="category" id="category" value={formData.category} onChange={handleInputChange}>
        <option value="clothes">clothes</option>
        <option value="toys">toys</option>
        <option value="electronics">Electronics</option>
        <option value="groceries">Groceries</option>
        <option value="digital">Digital</option>
    </select>
    <label >commmission</label>
    <input type="tel" name="commission" id="commission" value={formData.commission} onChange={handleInputChange}/>
    <label >Activeform</label>
    <input type="date" name="date" id="date" value={formData.date} onChange={handleInputChange}/>
    <label>LOGO</label>
    <input type="file" name="file" id="file" value={formData.logo} onChange={handleInputChange} />
    <label >Critical Account</label>
    <label>YES</label>
    <input type="checkbox" name="criticalaccount" id="yes" value="Yes" checked={formData.criticalaccount.includes('Yes')} onChange={handleInputChange}  />
    <label>NO</label>
    <input type="checkbox" name="criticalaccount" id="no" value="No" checked={formData.criticalaccount.includes('No')} onChange={handleInputChange}/>
    <select name="payment" id="payment" value={formData.payment} onChange={handleInputChange}>
        <option value="cash">Cash on Payment</option>
        <option value="upi">UPI</option>
        <option value="card">Card on payment</option>
    </select>
    <input type="submit" value="Submit" onClick={AddPerson}/> 
</form> 

<table className="App-table">
          <thead>
            <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phonenumber</th>
            <th>website</th>
            <th>contactname</th>
            <th>contactnumber</th>
            <th>contactemail</th>
            <th>notes</th>
            <th>type</th>
            <th>category</th>
            <th>commission</th>
            <th>date</th>
            <th>criticalaccount</th>
            <th>Payment</th>
            <th>Action</th>
          

            </tr>
            </thead>
            <tbody>
              {persons.map((p, index) => <tr key={index}>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{p.phone}</td>
                <td>{p.website}</td>
                <td>{p.contact}</td>
                <td>{p.number}</td>
                <td>{p.another}</td>
                <td>{p.notes}</td>
                <td>{p.type}</td>
                <td>{p.category}</td>
                <td>{p.commission}</td>
                <td>{p.date}</td>
                <td>{p.criticalaccount}</td>
                <td>{p.payment}</td>
                <td><button onClick={()=>handleDelete(index)}>Delete</button></td>
               </tr>)}
            </tbody>
        </table>
    </div>
  );
}

export default App;
