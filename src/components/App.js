import './App.css';
import React, {useState, useEffect} from 'react';
import {Header} from './Header';
import AddContact from './AddContact';
import EditContact from './EditContact';
import {ContactList} from './ContactList';
import ContactDetail from './ContactDetail';
import api from '../api/contacts';
import {uuid} from 'uuidv4';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
function App() {
  const LOCAL_STORAGE_KEY = "contacts"
  const [contacts, setContacts] = useState([]);
  const[searchTerm, setSearchTerm] = useState(""); 
  const[searchResults, setSearchResults] = useState([]);
  const retrieveContacts = async ()=>
  {
    const response = await api.get("/contacts");
    return response.data;
  }
  const addContactHandler = async(contact)=>{
   console.log(contact);

   const request = {
     id:uuid(),
     ...contact

   }
   const response = await api.post("/contacts", request)
   setContacts([...contacts, response.data /*{id: uuid(),...contact}*/]);
    };

    const updateContactHandler =async(contact)=>
      {
        const response =await api.put(`/contacts/${contact.id}`,contact)
        const {id,name,email} =response.data;
        setContacts(contacts.map((contact) =>
        {
          return contact.id === id ? {...response.data} : contact;

        })
        );
      };

    const removeContacthandler = async(id)=>
    {
      await api.delete(`/contacts/${id}`)
      const newContactList = contacts.filter((contact)=>{
      return contact.id !== id;
      })
      setContacts(newContactList)
    };

    const searchHandler =(searchTerm)=>
    {
      setSearchTerm(searchTerm);
      if(searchTerm !== '')
      {
        const newContactList = contacts.filter((contact)=>
        {
          return Object.values(contact)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        })
        setSearchResults(newContactList);

      }
      else
       setSearchResults(contacts);
    }

   useEffect(()=>
     {
    const getAllContacts = async ()=> {
   const allContacts =await retrieveContacts();
      if(allContacts)
      setContacts(allContacts)
    };
    getAllContacts();
  }, [])

    //   const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    //   if( retriveContacts)
    //   setContacts(retriveContacts);
    //  }, [])
  useEffect(()=>
  {
  // localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);


  return (
   <div className = "ui container"> 
   <Router>
     <Header />
     <Switch>
     <Route path ="/" exact     render ={(props)=>(<ContactList {...props} contacts = {searchTerm.length < 1 ? contacts : searchResults} 
                                                    getContactId = {removeContacthandler} 
                                                    term={searchTerm}
                                                    searchKeyword={searchHandler}/>)}></Route>
     <Route path = "/add" render ={(props)=>(<AddContact {...props} addContactHandler = {addContactHandler}/>)}></Route>
     <Route path = "/edit" render ={(props)=>(<EditContact {...props} updateContactHandler = {updateContactHandler}/>)}></Route>
     <Route path= "/contact/:id" component={ContactDetail}/>
    </Switch>
   </Router>
   </div>
  );
}

export default App;
 