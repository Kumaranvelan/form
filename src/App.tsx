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
  criticalAccountYes :string[];
  criticalAccountNo: string[];
  payment : string[];
  [key: string]: string | string[] | number;
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
    criticalAccountYes: [],
    criticalAccountNo:[],
    payment: [],
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Person | null>(null);
  const [selectedType, setSelectedType] = useState<string>(''); // Declare selectedType at the top
  const [criticalAccountYes, setCriticalAccountYes] = useState<boolean>(false); // Declare criticalAccountYes
  const [criticalAccountNo, setCriticalAccountNo] = useState<boolean>(false); // Declare criticalAccountNo


  console.log(persons);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const { name, value, type } = event.target;
  
    if (type === 'checkbox') {
      const checkbox = event.target as HTMLInputElement; // Use type assertion for checkbox
  
      if (editIndex !== null) {
        // If in edit mode, update the editFormData
        setEditFormData((prevData) => {
          const updatedArray = checkbox.checked
            ? [value]
            : (prevData![field] as string[]).filter((item) => item !== value);
          return {
            ...(prevData as Person),
            [field]: updatedArray,
          };
        });
      } else {
        // Otherwise, update the regular formData
        setFormData((prevData) => {
          const updatedArray = checkbox.checked
            ? [value]
            : (prevData![field] as string[]).filter((item) => item !== value);
          return {
            ...prevData,
            [field]: updatedArray,
          };
        });
      }
    } else {
      // Handle other input types (text, select, textarea) as before
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
    }
  };
  
  
  const AddPerson = (event: React.FormEvent) => {
    event.preventDefault();
  
    const newPerson: Person = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      contact: formData.contact,
      number: formData.number,
      another: formData.another,
      notes: formData.notes,
      type: [selectedType], // Wrap selectedType in an array
      category: formData.category,
      commission: formData.commission,
      date: formData.date,
      logo: formData.logo,
      criticalAccountYes: criticalAccountYes ? ['Yes'] : [],
      criticalAccountNo: criticalAccountNo ? ['No'] : [],
      payment: formData.payment,
    };
  
    setPersons((prevPersons) => [...prevPersons, newPerson]);
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
      criticalAccountYes: [],
      criticalAccountNo: [],
      payment: [],
    });
  
    setSelectedType('');
    setCriticalAccountYes(false);
    setCriticalAccountNo(false);
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
    
    const updatedPersons = [...persons];
  
    updatedPersons[editIndex] = editFormData;

    setPersons(updatedPersons);
    setEditIndex(null);
    setEditFormData(null);

    setSelectedType('');
    setCriticalAccountYes(false);
    setCriticalAccountNo(false);
  }
};


const handlecheckboxchange = (
  event: React.ChangeEvent<HTMLInputElement>,
  name: keyof Person
) => {
  const { checked } = event.target as { checked: boolean };

  if (editIndex !== null) {
    // Update editFormData
    setEditFormData((prevData) => {
      const updatedArray = [...(prevData![name] as string[] || [])];
      if (checked) {
        updatedArray.push(name as string);
      } else {
        const index = updatedArray.indexOf(name as string);
        if (index !== -1) {
          updatedArray.splice(index, 1);
        }
      }
      return {
        ...(prevData as Person),
        [name]: updatedArray,
      };
    });
  } else {
    // Update formData
    setFormData((prevData) => {
      const updatedArray = [...(prevData![name] as string[] || [])];
      if (checked) {
        updatedArray.push(name as string);
      } else {
        const index = updatedArray.indexOf(name as string);
        if (index !== -1) {
          updatedArray.splice(index, 1);
        }
      }
      return {
        ...prevData,
        [name]: updatedArray,
      };
    });
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
    <input type="radio" name="type"  value="small business"   checked={selectedType==='small business'}
      onChange={(event) => {
        setSelectedType(event.target.value); 
        handleInputChange(event, 'type'); // 
      }}/>
    <label >Entreprise</label>
    <input type="radio" name="type"  value="Entreprise"    checked={selectedType==='Entreprise'}
       onChange={(event) => {
        setSelectedType(event.target.value); // Update the selected type
        handleInputChange(event, 'type'); // Handle form input change
      }}/>
    <label >Entreprenuer</label>
    <input type="radio" name="type"  value= "Entreprenuer"  checked={selectedType==='Entreprenuer'}
       onChange={(event) => {
        setSelectedType(event.target.value); // Update the selected type
        handleInputChange(event, 'type'); // Handle form input change
      }}/>
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
    <input type="checkbox" name="criticalAccountYes"  value={"Yes"}  checked={editIndex !== null ? editFormData?.criticalAccountYes.includes('Yes') : formData.criticalAccountYes.includes('Yes')}
  onChange={(event) => {
    setCriticalAccountYes(event.target.checked); // Update the state for YES
    handleInputChange(event, 'criticalAccountYes'); // Handle form input change
  }}
/>
    <label>NO</label>
    <input type="checkbox" name=""  value={"No"} checked={editIndex !== null ? editFormData?.criticalAccountNo.includes('No') : formData.criticalAccountNo.includes('No')}
  onChange={(event) => {
    setCriticalAccountNo(event.target.checked);
    handleInputChange(event, 'criticalAccountNo');
  }} />
    <select name="payment" id="payment" value={editIndex !== null ? editFormData?.payment:formData.payment} onChange={(event) => handleInputChange(event,'payment')}>
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
                <td>{p.criticalAccountYes}
                {p.criticalAccountNo}</td>
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