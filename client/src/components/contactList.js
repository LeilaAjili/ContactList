import React, { Component } from 'react';
import Card from './card'
import Form from './form'
import axios from 'axios';
import '../style.scss'

class contactList extends Component{

state={
    contacts:[]
}

componentDidMount(){
    this.getContacts()
}

getContacts=()=>{
    axios.get('/contacts').then((res)=>{
        this.setState({contacts:res.data})
    })
}

handleAdd = (newContact) =>
axios.post('/addContact', newContact).then(this.getContacts())


handleDelete = (id) =>{
    axios.delete(`/deleteContact/${id}`).then(this.getContacts())
}
handleEdit =(contact) =>{
    axios.put(`/editContact/${contact.id}`,{
        name: contact.name,
        phone:contact.phone,
        mail:contact.mail,
        link:contact.link

    }).then(this.getContacts())}

render () {
    return (
         
     <div>
       <div className="container">
        <div className="col-xs-8">
        <h1>Contact List APP</h1>
          <div className="card">
            <div className="card-body div1"> 
              <h5 className="card-title">Click this button to add a new contact!</h5>
              
             <div>  </div> 
             <button className="addButton" title="Add new contact">ADD
             <Form handleAdd={this.handleAdd} />
             </button> 
            </div>
          </div>
        </div> 
        </div>
    
<div className="frames">
    
{this.state.contacts.map((el,i)=> (
    <Card
    Key = {i}
    contact = {el}
    handleDelete={this.handleDelete}
    handleEdit={this.handleEdit}
    
    />
)
)}
    </div> 
    </div>

    )}}


export default contactList