import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import FormContainer from './FeedBack/FormContainer.jsx'

export default class Feedback extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             show: false
        }
    }
    
    render() {
        let modalClose = () => this.setState({ show: !this.state.show });

        return (
            console.log(this.props),
            <div>
                <Button
                    variant="info"
                    size="sm"
                    onClick={modalClose}
                >
                    Feedback
                </Button>
                <Modal
                    show={this.state.show}
                    onHide={modalClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Feedback
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormContainer Task={this.props.Task} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={modalClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
