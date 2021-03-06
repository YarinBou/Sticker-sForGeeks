import React from 'react';
import Axios from "axios";


function ActivityLogEntry(props){
    const log = props.logData;
    return (
        <li>
            {log.DateAndTime} ] User {log.username}, did {log.activityType}, state: {log.activityState}
        </li>
    )
}

function ActivityLogList(props) {
    function logToEntry(log, i){
        return <ActivityLogEntry key={i} logData={log}></ActivityLogEntry>
    }
    return (
      <ol>
          {props.logs.map(logToEntry)}
      </ol>
    );
  }

function ActivityLogSearch(props) {

    function filterLogs(logs, searchText){
        console.log(`Filtering by ${searchText}`);
        const filtered = logs.filter(log => log.username.startsWith(searchText));
        return filtered;
    }

    function handleSearchChanged(e){
        props.onFilterChanged((logs) => filterLogs(logs, e.target.value));
    }

    return (
        <input type="text" placeholder="Start typing username..." onKeyUp={handleSearchChanged}></input>
    )
}

export default class ActivityLogComponent extends React.Component{

    constructor(){
        super();
        this.logs = [];
        this.state = {
            logData: [],
            isLoading: true
        }
    }

    async componentDidMount(){
        console.log('Component did mount');
        try{
            const response = await Axios.get("/api/userActivity");
            this.logs = response.data;
            console.log(this.logs);
            this.setState({
                logData: this.logs,
                isLoading: false
            })
        } catch (e){
                console.log(e);
        }
    }

    handleFilterChanged(filterFunction){
        const filteredLogs = filterFunction(this.logs);
        this.setState({
            logData: filteredLogs
        })
    }

    render(){
        if (this.state.isLoading)
            return <div>Loading, please wait...</div>
        else
            return (
                <div>
                    <ActivityLogSearch onFilterChanged={(filterFunc) => this.handleFilterChanged(filterFunc)}></ActivityLogSearch>
                    <ActivityLogList logs={this.state.logData}></ActivityLogList>
                </div>
        )
    }
}