import React, { Component } from 'react'
import {getDataFromAPI} from '../HandleAPICalls/actions'
import {connect} from 'react-redux'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'


import GithubComponent from './component'

const initialState = {
    currentPage: 1,
    recordsPerPage: 10,
    totalRecords: 0,
    totalPages: 0,
    userList: [],
    loading:true
}


 class Githubcontainer extends Component {
    constructor(props){
        super(props);
        this.state= initialState;
    }
    
    componentDidMount(){
     this.props.getDataFromAPI(
         'https://reqres.in/api/users',
         'GET',
         undefined,
         (response)=>{             
            this.setState( (prevState)=>(
                {    
                currentPage: response.page,
                recordsPerPage:response.per_page,
                totalRecords:response.total,
                totalPages:response.total_pages,
                userList:response.data   ,
                loading:false
                }
            ))
         },
         err=>console.log(err)    
     )   
    }
    
    render() {       
        const {currentPage,recordsPerPage,totalRecords,totalPages,userList,loading}= this.state;                 
        if(loading){
            return (
        <Dimmer active inverted >
           <Loader content='Loading' />
        </Dimmer>               
            )
        }
        return (
                <GithubComponent 
                currentPage={currentPage} 
                recordsPerPage={recordsPerPage} 
                totalPages={totalPages} 
                totalRecords={totalRecords} 
                userList={userList}
                />
        )
    }
}

export default connect(null,{getDataFromAPI})(Githubcontainer)