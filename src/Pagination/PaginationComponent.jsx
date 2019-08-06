import React from 'react';
import { Pagination } from 'semantic-ui-react'



export default function PaginationComponent({total,userList,change,getData}) {

    return (
        <div className='Pagination'>
            {getData()}
            <Pagination 
             defaultActivePage={5}
             totalPages={total} 
             onPageChange={change}
             />
        </div>
    )
}
