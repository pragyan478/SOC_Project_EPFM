import React, { Component } from 'react'
import { Container, Table, Image, Button, Dropdown, DropdownButton, ButtonGroup, Accordion, Card, InputGroup, FormControl, Form } from 'react-bootstrap'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import EmployeePage from './EmployeePage.js'
import AddTeam from './AddTeam.js'
import HeaderAfterLogin from '../HeaderAfterLogin.js'
//import logo from './logo.jpg'

const dispCenter = {
    horizontalAlign: "center"
}

const imgsize = {
    width: "180px",
    height: "180px"
}

function Blog(props) {
    if(!props.PendingTasks) return <tbody><tr><td colSpan="6">No data found</td></tr></tbody>
    else {
        return (
            <tbody>
                {props.PendingTasks.map((value, index) => {
                return (
                        <tr key={index}>
                            <td>{value.id}</td>
                            <td>{value.Task}</td>
                            <td>{value.TaskDescription}</td>
                            <td>{value.Deadline}</td>
                            <td>{value.AssignedTo}</td>
                            <td>
                                <Button size="sm">
                                    {value.RequestClose ? (
                                        <h6>Request Close</h6>
                                        ) : (
                                        <h6>Force Close</h6>
                                    )}
                                </Button>
                            </td>
                        </tr>
                    )
                }
                )}
            </tbody>
        )
    }
}

class ManagerHomepage extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            userFirstName: "firstname",
            userLastName: "lastname",
            yourTeam: null,
            Task: "",
            TaskDescription: "",
            Deadline: "",
            AssignTo: "",
            pendingTasks: [
                {id: 1, Task: "123", TaskDescription: "456", Deadline: "44/44/4444", AssignedTo: "Dikshant", RequestClose: false}
            ]
        }
    }

    componentDidMount(){
        fetch('http://localhost:3001/loginm',        //fetch user data
            {
                method: 'POST',
            })
            .then(res => res.json())
            .then(user => {
                this.setState({memail:user.email});
                this.setState({userFirstName:user.firstname});
                this.setState({userLastName:user.lastname});
                fetch('http://localhost:3001/team',
                {
                    method: 'POST',
                    body: JSON.stringify(user),

                    headers:{
                        'Content-Type':'application/json'
                    }
                }
                )
                .then(res => res.json())
                .then(team => {
                    console.log(team)
                    this.setState({yourTeam:team})
                })
            })
            
    
        }

    

    handleTaskNameChange = (event) => {
        this.setState({Task: event.target.value})
    }

    handleTaskDescriptionChange = (event) => {
        this.setState({TaskDescription: event.target.value})
    }

    handleTaskDateChange = (event) => {
        this.setState({Deadline: event.target.value})
    }

    handleSubmit = (event) => {
        alert(`${this.state.Task} ${this.state.TaskDescription} ${this.state.Deadline} ${this.state.AssignTo}`)
    }
    
    render() {
        const { yourTeam } = this.state
        return (
            <Router>
            <div className="App">
                <HeaderAfterLogin
                    drawerClickHandler={this.drawerToggleClickHandler}
                    handleLog={this.handleLog}
                />
                <Container>
                    <Image src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" style={imgsize} roundedCircle />
                </Container><br />
                <Button variant="primary" size="sm" style={dispCenter}>{this.state.userFirstName}&nbsp;{this.state.userLastName}</Button><br /><br />
                <ButtonGroup style={dispCenter} vertical>
                    <DropdownButton as={ButtonGroup} title="Your Team" id="bg-vertical-dropdown" size="sm">
                        {yourTeam ? (
                            yourTeam.map((value, index) => (
                                <Dropdown.Item key={index} size="sm">
                                      {value.firstname} {value.lastname}
                                    {/*<Link to={`/user/${value.id}`}>
                                      
                            </Link>*/}
                                </Dropdown.Item>
                            )
                        )) : (
                            <Dropdown.Item>No members to show</Dropdown.Item>
                        )}
                    </DropdownButton>
                </ButtonGroup><br /><br /><br />
                <Route path="/userm/:employeeId" render={({ match }) => (
                    <EmployeePage employeeId={match.params.employeeId} />
                )} />
                <AddTeam  /><br /><br /><br />
                <div>
                    <Accordion defaultActiveKey="1">                    
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="button" eventKey="0">
                                    Create Task
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Form onSubmit={this.handleSubmit}>
                                    <Card.Body>
                                        <InputGroup size="sm" className="mb-3" style={{ width: "30%" }}>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="inputGroup-sizing-sm">Task Name</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl onChange={this.handleTaskNameChange} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                        </InputGroup>
                                        <br />
                                        <InputGroup size="sm" className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="inputGroup-sizing-sm">Task Description</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl onChange={this.handleTaskDescriptionChange} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                        </InputGroup>
                                        <br />
                                        <InputGroup size="sm" className="mb-3" style={{ width: "17%" }}>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="inputGroup-sizing-sm">Deadline</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl onChange={this.handleTaskDateChange} type="date" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                        </InputGroup>
                                        <br />
                                        <InputGroup size="sm" className="mb-3">
                                            <DropdownButton
                                                as={InputGroup.Append}
                                                variant="outline-secondary"
                                                title="Assign Task To"
                                                id="input-group-dropdown-2"
                                            >
                                                {yourTeam ? (
                                                    yourTeam.map((value, index) => (
                                                        <Dropdown.Item key={index} size="sm">
                                                            <Button onClick={() => (this.setState({AssignTo: value.email}))} type="submit">
                                                                {value.firstname} {value.lastname}
                                                            </Button>
                                                        </Dropdown.Item>
                                                    )
                                                    )) : (
                                                        <Dropdown.Item>No members to show</Dropdown.Item>
                                                    )
                                                }
                                            </DropdownButton>
                                        </InputGroup>
                                        <Button type="submit">Submit</Button>
                                    </Card.Body>
                                </Form>
                            </Accordion.Collapse>
                        </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="button" eventKey="1">
                                        Pending Tasks
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <Table striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Tasks</th>
                                                    <th>Task Description</th>
                                                    <th>Deadline</th>
                                                    <th>Assigned to</th>
                                                    <th>Force Close</th>
                                                </tr>
                                            </thead>
                                            <Blog PendingTasks={this.state.pendingTasks} />
                                        </Table>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                    </Accordion>
                </div>
            </div>
            </Router>
        )
    }
}

export default ManagerHomepage