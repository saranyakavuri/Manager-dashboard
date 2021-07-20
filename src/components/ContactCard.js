import React from 'react';
import { Link } from 'react-router-dom';
import download from '../images/download.jpg';
 const ContactCard = (props)=>
{
    const {id, name, email} = props.contact;
    return(
        <div className = "item">
            <img className ="ui avtar image" src = {download} alt = "download" width ="30px" height  ="40px"   />
            <div className ="content">
            <Link to ={{pathname:`/contact/${id}`, state:{contact:props.contact}}}>
            <div className = "header">{name}</div>
            <div>{email}</div>
            </Link>
      </div>
      <i className = "trash alternate outline icon" 
      style ={{color:"red", marginTop : "8px", marginLeft:"10px" }}
      onClick = {()=> props.clickHandler(id) }></i>

    <Link to ={{pathname:`/edit`, state:{contact:props.contact}}}>
      <i className = "edit alternate outline icon" 
      style ={{color:"blue", marginTop : "8px" }}
      ></i>
      </Link>
    </div>
    )
}
export default ContactCard;