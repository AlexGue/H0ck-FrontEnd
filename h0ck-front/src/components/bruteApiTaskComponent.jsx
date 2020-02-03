
import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import request from 'request';


class bruteApiTaskComponent extends Component {

   

    constructor(props) {
        super(props);
        console.log(props)
        this.state = { expanded: false }
        this.endpoint = "https://orchestrator.h0ck.alexgd.es/";
    }





    getProgressFinished = () => {
        const task = this.props.taskObject;
        return 100 * (task.minitasks.finished / (task.minitasks.pending + task.minitasks.progress + task.minitasks.finished));
    }


    getProgressWorking = () => {
        const task = this.props.taskObject;
        return 100 * (task.minitasks.progress / (task.minitasks.pending + task.minitasks.progress + task.minitasks.finished));
    }

    getMethodBadge = (method) => {
        if (!method) { return "" }
        if (method.toLowerCase() == "get") {
            return <span style={{ marginRight: "5px" }} className="badge badge-info">{method}</span>
        }
        else if (method.toLowerCase() == "post") {
            return <span className="badge badge-success">{method}</span>
        }
        else if (method.toLowerCase() == "put") {
            return <span className="badge badge-warning">{method}</span>
        }
        else if (method.toLowerCase() == "delete") {
            return <span className="badge badge-danger">{method}</span>
        }
        else {
            return <span className="badge badge-dark">{method}</span>
        }
    }

    RESTDeleteTask = (taskId) => {
        request({method: "DELETE", uri: this.endpoint + "task/bruteapi/" + taskId , })
    }

    render() {
        const taskId = this.props.taskId;
        const progressFinished = this.getProgressFinished();
        const progressWorking = this.getProgressWorking();
        const task = this.props.taskObject;
        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-auto">
                            <b>TaskId:</b> {taskId.substring(0, 7) + '...'}
                        </div>
                        <div className="col">
                            <div className="progress">
                                <div className="progress-bar bg-success" role="progressbar" style={{ "width": progressFinished + "%" }} aria-valuenow={progressFinished} aria-valuemin="0" aria-valuemax="100"></div>
                                <div className="progress-bar bg-warning" role="progressbar" style={{ "width": progressWorking + "%" }} aria-valuenow={progressWorking} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <button onClick={() => this.setState({ expanded: !this.state.expanded })} className="btn btn-primary m-2"> {this.state.expanded ? "-" : "+"} </button>
                        <button onClick={() => {this.RESTDeleteTask(taskId);}} className="btn btn-primary m-2">  🗑</button>
                    </div>
                    <div className="row m-2">
                        {this.getMethodBadge(task.config.method)}{task.config.url}
                    </div>

                </div>
                <div className="card-body" hidden={!this.state.expanded}>
                    <h6 className="card-title">Configuration</h6>
                    <ReactJson theme="hopscotch" collapsed="false " src={task.config} />
                    <h6 className="card-title">Responses</h6>
                    <ReactJson theme="hopscotch" collapsed="false " src={task.resolution} />
                </div>
            </div>

        );
    }
}

export default bruteApiTaskComponent;