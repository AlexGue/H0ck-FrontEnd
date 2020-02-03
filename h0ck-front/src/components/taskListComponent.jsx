import React, { Component } from 'react';
import BruteApiTaskComponent from './bruteApiTaskComponent';
import request from 'request';



class taskListComponent extends Component {
    state = { taskList: {} }



    componentDidMount() {
        this.getTaskComponents();
        setInterval(this.getTaskComponents, 5000)
    }

    getTaskComponents = () => {
        request("https://orchestrator.h0ck.alexgd.es/tasks/resume", (error, response, bodyRes) => {
            console.log(bodyRes)
            this.updateTaskList(JSON.parse(bodyRes))

        })
    }

    updateTaskList = (taskList) => {
        this.setState({ taskList: taskList })
    }

    getBruteApiList = () => {
        if (this.state.taskList["bruteapi"]) {
            return Object.keys(this.state.taskList["bruteapi"]).map(task => {
                return <BruteApiTaskComponent key={task} taskId={task} taskObject={this.state.taskList["bruteapi"][task]}></BruteApiTaskComponent>
            })
        }
    }


    render() {

        return (
            <React.Fragment>
                <h3> Brute API tasks:</h3>
                {this.getBruteApiList()}
            </React.Fragment>
        );
    }
}

export default taskListComponent;
