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

  console.log(persons);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Person | null>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const { name, value } = event.target;
    if (editIndex !== null) {
      // If in edit mode, update the editFormData
      setEditFormData((prevData) => {
        return {
          ...(prevData as Person),
          [field]: value,
        };
      });
    } else {
      // Otherwise, update the regular formData
      setFormData({ ...formData, [name]: value });
    }
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

  const handleDelete = (index: number) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this person?');

  if (confirmDelete) {
    const updatedPersons = [...persons];
    updatedPersons.splice(index, 1);
    setPersons(updatedPersons);
  }
};

const handleEdit = (index: number) => {
  
  setEditIndex(index);
  setEditFormData(persons[index]);
};

const handleEditSubmit = (event:React.FormEvent) => {
  event.preventDefault();
  if (editIndex !== null && editFormData !== null) {
    // Create a copy of the persons array
    const updatedPersons = [...persons];
    // Update the person's data in the copied array
    updatedPersons[editIndex] = editFormData;
// Update the state with the updated array and reset edit mode
    setPersons(updatedPersons);
    setEditIndex(null);
    setEditFormData(null);
  }
};
   return (
    <div>
    <form id="myForm" >
    <label htmlFor="name">Name</label>
    <input type="text" id="name" name="name" value={editIndex !== null ? editFormData?.name:formData.name} onChange={(event) => handleInputChange(event, 'name')} />
    <label>Email</label>
    <input type="text" name="email" id="email" value={editIndex !== null ? editFormData?.email:formData.email} onChange={(event) => handleInputChange(event, 'email')} />
    <label>PhoneNumber</label>
    <input type="tel" name="number" id="number" value={editIndex !== null ? editFormData?.phone:formData.phone} onChange={(event) => handleInputChange(event, 'phone')}/>
    <label>website</label>
    <input type="text" id="website" name="website" value={editIndex !== null ? editFormData?.website:formData.website} onChange={(event) => handleInputChange(event, 'website')} />
    <label >contactname</label>
    <input type="text" id="contact" name="contact"value={editIndex !== null ? editFormData?.contact:formData.contact} onChange={(event) => handleInputChange(event, 'contact')}/>
    <label >contactnumber</label>
    <input type="tel" id="phone" name="phone"value={editIndex !== null ? editFormData?.number :formData.number} onChange={(event) => handleInputChange(event, 'number')} />
    <label>ContactMail</label>
    <input type="email" id="another" name="another"value={editIndex !== null ? editFormData?.another :formData.another} onChange={(event) => handleInputChange(event, 'another')}/>
    <label>Notes</label>
    <textarea name="notes" id="notes" value={editIndex !== null ? editFormData?.notes:formData.notes} onChange={(event) => handleInputChange(event, 'notes')}></textarea>
    <label >Type:</label>
    <label >Small buisiness</label>
    <input type="radio" name="type" id="small business" value={editIndex !== null ? editFormData?.type:"small business"}onChange={(event) => handleInputChange(event, 'small business')}/>
    <label >Entreprise</label>
    <input type="radio" name="type" id="entreprise" value={editIndex !== null ? editFormData?.type:"Entreprise"} onChange={(event) => handleInputChange(event, 'Entreprise')}/>
    <label >Entreprenuer</label>
    <input type="radio" name="type" id="entreprenuer" value={editIndex !== null ? editFormData?.type:"Entreprenuer"} onChange={(event) => handleInputChange(event, 'Entreprenuer')}/>
    <label > category</label>
    <select name="category" id="category" value={editIndex !== null ? editFormData?.category:formData.category} onChange={(event) => handleInputChange(event, 'category')}>
        <option value="clothes">clothes</option>
        <option value="toys">toys</option>
        <option value="electronics">Electronics</option>
        <option value="groceries">Groceries</option>
        <option value="digital">Digital</option>
    </select>
    <label >commmission</label>
    <input type="tel" name="commission" id="commission" value={editIndex !== null ? editFormData?.commission:formData.commission} onChange={(event) => handleInputChange(event, 'commission')}/>
    <label >Activeform</label>
    <input type="date" name="date" id="date" value={editIndex !== null ? editFormData?.date:formData.date} onChange={(event) => handleInputChange(event, 'date')}/>
    <label>LOGO</label>
    <input type="file" name="file" id="file" value={editIndex !== null ? editFormData?.logo:formData.logo} onChange={(event) => handleInputChange(event, 'logo')} />
    <label >Critical Account</label>
    <label>YES</label>
    <input type="checkbox" name="criticalaccount" id="yes" value={editIndex !== null ? editFormData?.criticalaccount:"Yes"}  onChange={(event) => handleInputChange(event, 'Yes')}  />
    <label>NO</label>
    <input type="checkbox" name="criticalaccount" id="no" value={editIndex !== null ? editFormData?.criticalaccount:"No"} onChange={(event) => handleInputChange(event, 'No')}/>
    <select name="payment" id="payment" value={editIndex !== null ? editFormData?.payment:formData.payment} onChange={(event) => handleInputChange(event, 'payment')}>
        <option value="cash">Cash on Payment</option>
        <option value="upi">UPI</option>
        <option value="card">Card on payment</option>
    </select>
    <input type="submit" value={editIndex !== null ? "Edit" :"Submit"} 
     onClick={editIndex !== null ? handleEditSubmit : AddPerson}/> 
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
                <td><button onClick ={() =>handleEdit(index)}>Edit</button></td>
                <td><button onClick={()=>handleDelete(index)}>Delete</button></td>
               </tr>)}
            </tbody>
        </table>
    </div>
  );
}
export default App;