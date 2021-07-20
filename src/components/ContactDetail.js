import React from 'react';
import {Link} from 'react-router-dom';
import download from "../images/download.jpg";

const ContactDetail = (props)=>
{
    console.log('props in ContactDetail', props)
    const {name, email} = props.location.state.contact;
return(
    <div className="main">
        <div className="ui card centered">
            <div className="image">
                <img src={download} alt ="download"/>
            </div>
            <div className ="content">
                <div className="header">{name}</div>
                <div className="description">{email}</div>
            </div>
          <div className="center-div">
              <Link to ="/">
                  <button className="ui button blue center">Back to Contact List</button>
              </Link>
          </div>

        </div>
    </div>
);
};
export default ContactDetail;