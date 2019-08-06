import React from 'react'
import { Table } from 'semantic-ui-react'


export default function component({currentPage,recordsPerPage,totalPages,totalRecords,userList}) {
    
    return (
            <Table basic='very' celled collapsing>
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
                        <Table.Cell>
                        {data.id}
                        </Table.Cell>
                        <Table.Cell>{data.email}</Table.Cell>
                        <Table.Cell>{data.first_name}</Table.Cell>
                        <Table.Cell>{data.last_name}</Table.Cell>
                        <Table.Cell>
                            <img src={data.avatar} alt=""/>
                        </Table.Cell>
                    </Table.Row>
                    })
                }
            </Table.Body>

            </Table>
    )
}


