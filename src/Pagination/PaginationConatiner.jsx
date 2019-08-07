import React, { Component } from "react";
import { getDataFromAPI } from "../HandleAPICalls/actions";

import { connect } from "react-redux";
import { Table, Header } from "semantic-ui-react";
import PaginationComponent from "./PaginationComponent";

const InitialState = {
  userList: [],
  onePage: 100,
  totalPage: 0,
  currentPage: 1,
  loading: true,
  err: ""
};

class PaginationConatiner extends Component {
  constructor(props) {
    super(props);
    this.state = InitialState;
  }

  componentDidMount() {
    const { onePage } = this.state;
    this.props.getDataFromAPI(
      ` http://ec2-52-66-170-70.ap-south-1.compute.amazonaws.com:8090/api/v2/admin/orders/all?limit=${onePage}`,
      "GET",
      undefined,
      response => {
        console.log(response);

        this.setState(prevState => ({
          currentPage: 1,
          totalPage: parseInt(response.data.total / prevState.onePage),
          userList: response.data.list,
          loading: false
        }));
      },
      err => {
        console.log(err);
        this.setState(prev => ({
          err: err.statusText
        }));
      }
    );
  }

  changeList = (e, data) => {
    const currentPageNo = data.activePage;
    const { onePage } = this.state;
    console.log(onePage * currentPageNo);

    this.props.getDataFromAPI(
      `http://ec2-52-66-170-70.ap-south-1.compute.amazonaws.com:8090/api/v2/admin/orders/all?limit=${onePage}&offset=${onePage *
        currentPageNo}`,
      "GET",
      undefined,
      response => {
        console.log(response);

        this.setState(prevState => ({
          currentPage: currentPageNo,
          userList: response.data.list
        }));
      },
      err => {
        console.log(err);
        this.setState(prev => ({
          err: err.statusText
        }));
      }
    );
  };

  onClick = e => {
    console.log(e);
  };

  getData = () => {
    const { userList } = this.state;
    return (
      <Table celled sortable>
        <Table.Header>
          <Table.Row>
            {Object.keys(userList[0]).map(key => (
              <Table.HeaderCell
                key={key}
                onClick={this.onClick}
                sorted="ascending"
              >
                {key}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {userList.map(data => {
            return (
              <Table.Row
                key={data.id}
                positive={data.status == "completed" ? true : false}
                negative={data.status == "cancelled" ? true : false}
              >
                {Object.keys(userList[0]).map(key => (
                  <Table.Cell key={key} negative={data[key] ? false : true}>
                    {data[key]}
                  </Table.Cell>
                ))}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  };

  render() {
    const { loading, totalPage, userList, err, onePage } = this.state;
    if (err.length > 0) {
      return <Header as="h1">{err}</Header>;
    }
    if (loading) {
      return <Header as="h1">Loading...</Header>;
    }
    return (
      <PaginationComponent
        total={totalPage}
        userList={userList}
        change={this.changeList}
        getData={this.getData}
      />
    );
  }
}

export default connect(
  null,
  { getDataFromAPI }
)(PaginationConatiner);
