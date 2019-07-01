import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

function Blog(props) {
    return (
        <tbody>
            {props.CompletedTasks.map((value, index) => {
                return (
                    <tr key={index}>
                        <td>{value.id}</td>
                        <td>{value.Task}</td>
                        <td>{value.TaskDescription}</td>
                        <td>{value.Date}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}

class TasksCompleted extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            completedTasks: [
               { id: 1, Task: "Task 1", TaskDescription: "Description 1", Date: "dd/mm/yyyy" },
               { id: 2, Task: "Task 2", TaskDescription: "Description 2", Date: "dd/mm/yyyy" },
               { id: 3, Task: "Task 3", TaskDescription: "Description 3", Date: "dd/mm/yyyy" },
               { id: 4, Task: "Task 4", TaskDescription: "Description 4", Date: "dd/mm/yyyy" }
            ]
        }
    }
    

    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tasks</th>
                        <th>Task Description</th>
                        <th>Date Completed</th>
                    </tr>
                </thead>
            <Blog CompletedTasks={this.state.completedTasks} />
            </Table>
        )
    }
}

export default TasksCompleted
