import React, { Component } from 'react';
import {getDataFromAPI} from '../HandleAPICalls/actions';

import {connect} from 'react-redux';
import { Table } from 'semantic-ui-react'
import PaginationComponent from './PaginationComponent';

const InitialState={
    userList:[],
    onePage:10,
    totalPage:0,
    currentPage:1,
    loading:true,
    err:'',
}

 class PaginationConatiner extends Component {
     constructor(props){
         super(props);
         this.state=InitialState;

     }
    
    componentDidMount(){  
        this.props.getDataFromAPI(
            ' http://ec2-52-66-170-70.ap-south-1.compute.amazonaws.com:8090/api/v2/admin/orders/all?limit=10',
            'GET',
            undefined,
            (response)=>{        
                console.log(response);
                
                this.setState((prevState)=>({
                    onePage: 10,
                    currentPage:1,
                    totalPage:response.data.total/prevState.onePage,
                    userList: response.data.list,
                    loading:false
                }))
                
            },
            err=> {
                console.log(err)
                this.setState((prev)=>({
                   err:err.statusText
                }))
            }
        )
    }
    
    changeList= (e,data)=>{
        const currentPageNo=data.activePage;
        const {onePage}= this.state;
        console.log(onePage*currentPageNo);
        
        this.props.getDataFromAPI(
            `http://ec2-52-66-170-70.ap-south-1.compute.amazonaws.com:8090/api/v2/admin/orders/all?limit=10&offset=${onePage*currentPageNo}`,
            'GET',
            undefined,
            (response)=>{
                console.log(response);
                
                this.setState((prevState)=>({
                    currentPage:currentPageNo,
                    userList: response.data.list,
                }))
            },
            err=> {
                console.log(err)
                this.setState((prev)=>({
                   err:err.statusText
                }))
            }
        )

    }
    getData= ()=>{
        const {userList}= this.state;
        return <Table basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            {
            Object.keys(userList[0]).map(key=> <Table.HeaderCell key={key}>{key}</Table.HeaderCell> )
            }
          </Table.Row>
        </Table.Header>

        <Table.Body>
            {
                userList.map(data=>{
                    return  <Table.Row key={data.id}>
                    {Object.keys(userList[0]).map(key=> <Table.Cell key={key}>{ data[key]}</Table.Cell> )}
                </Table.Row>
                })
            }
        </Table.Body>
        </Table>
    }

    
    render() {
        const {loading,totalPage,userList,err}= this.state;
        if(loading || err.length>0){
            return (
                <div>
                    {err}
               </div>
            )
        }
        return (
            <PaginationComponent total={totalPage} userList={userList} change={this.changeList} getData={this.getData} />
        )
    }
}

export default connect(null,{getDataFromAPI})(PaginationConatiner)
