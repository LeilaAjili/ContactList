import React, {Component} from 'react'
import {Button, Modal, FormControl ,Card} from 'react-bootstrap';
import '../App.scss'


class Form extends Component{


    state={
        show:false,

        name : this.props.card ? this.props.card.name : "",
        phone : this.props.card ? this.props.card.phone : "",
        mail : this.props.card ? this.props.card.mail : "",
        link: this.props.card ? this.props.card.link : "",
        id:this.props.card?this.props.card._id:""
        

    }

    

    handleShow = () =>{
        this.setState({
            show: !this.state.show
    })};


    handleOk = () =>{
        this.props.card?
        this.props.handleEdit({
            name:this.state.name,
            phone:this.state.phone,
            mail:this.state.mail,
            link:this.state.link,
            id: this.state.id,
        })
        &&
        this.setState({show:false,
          name:"",
          phone:"",
          mail:"",
          link:""}
          )

        :

        this.props.handleAdd(this.state)
        &&
        this.setState({
            show:false,
            name:"",
            phone:"",
            mail:"",
            link:""
            
        })
    }

    handleChange=(e)=>{

        this.setState({
    
          [e.target.name]:e.target.value
        })
    
      }

      render(){

        return(
<>
<button className="modalButton" onClick={this.handleShow}
 title="Add new contact"
> </button> 

<Modal show={this.state.show} onHide={this.handleShow} animation={false} onOk={()=>{this.handleOk()} }>
  <Modal.Header closeButton>
    <Modal.Title>Add/Edit contact</Modal.Title>
  </Modal.Header>
  <Modal.Body> 
  <form >
    <div class="form-group">
     <label for="formGroupExampleInput">Name</label>
     <input type="text" class="form-control" id="formGroupExampleInput" onChange={this.handleChange} name="name" value={this.state.name}/>
     
     
      <label for="exampleFormControlSelect1">Phone</label>
      <input type="text" class="form-control" id="formGroupExampleInput" onChange={this.handleChange} name="phone" value={this.state.phone}/>
     
     <label for="exampleFormControlSelect1">Mail</label>
    <input type="text" class="form-control" id="formGroupExampleInput"  onChange={this.handleChange} name="mail" value={this.state.mail}/>

    <label for="exampleFormControlSelect1">Avatar</label>
    <input type="text" class="form-control" id="formGroupExampleInput"  onChange={this.handleChange} name="link" value={this.state.link}/>


    </div>
</form>
  </Modal.Body>
  
  <Modal.Footer>
    <Button variant="danger" onClick={this.handleShow} >
      Close
    </Button>
    <Button variant="success" onClick={()=>this.handleOk()}>
      Save Changes 
    </Button>
  </Modal.Footer>
</Modal>
    </>        
        )
      }
}


export default  Form