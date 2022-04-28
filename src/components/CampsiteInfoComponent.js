
import React, { Component } from 'react';
//import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, Button, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: 1,
            author: " ",
            text: " ",
            isModalOpen: false
        };
        
        this.toggleModal = this.toggleModal.bind(this);
        
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    }

    render() {
       return (
           <React.Fragment>
    
                <Button outline onClick={this.toggleModal}>
                                        <i className="fa fa-pencil fa-lg" /> Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalBody>

                            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                <div className="form-group">
                                    
                                    <Control.select model=".rating" id="rating"
                                     name="rating"
                                     className="form-control">

                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>

                                    </Control.select>
                                
                                    
                                </div>   
                                <div className="form-group">
                                    <Control.text model=".author" id="author"
                                     name="author" className="form-control" 
                                     validators={{
                                                minLength: minLength(2),
                                                maxLength: maxLength(15)
                                            }}/>   
                                    
                                   
                                </div>  
                                <div className="form-group">
                                    <Control.textarea model=".text" id="text" name="text" className="form-control"
                                    validators={{
                                                minLength: minLength(2),
                                                maxLength: maxLength(15)
                                            }}/> 
                                </div>  

                                <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be at least 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                <button type="submit" color="primary"> Post Comment </button>
                            </LocalForm>
                        </ModalBody>
                </Modal>
           </React.Fragment>
       )
       
    }
}  

    function RenderCampsite({campsite}){
        return (
            <div className='col-md-5 m-1'>
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }


   function RenderComments({comments}){
        if(comments){
            return(
                <div className='col-md-5 m-1'>
                    <h4>Comments</h4>
                    {comments.map(comment => {return(
                       <div key={comment.id}>
                        <p>{comment.text}</p>
                        <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                       </div>
                    )})}
                    <CommentForm></CommentForm>
                </div>
            )
        } else {
            return(
                <div>
                </div>
            )
        }
    }




   function CampsiteInfo(props) {
        if(props.campsite) {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col">
                                <Breadcrumb>
                                    <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                                </Breadcrumb>
                                <h2>{props.campsite.name}</h2>
                                <hr />
                        </div>   
                    </div>
                    <div className='row'>
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments}/>
                    </div>
                </div>   
            );
        }

            return <div />;
        }


        
    

export default CampsiteInfo;
