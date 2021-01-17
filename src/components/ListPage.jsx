import React,{useContext} from 'react'
import './List.css'
import TableComponent from './TableComponent';

const ListPage = ({users,setUsers}) => {
    
    return (
        <div className="list_page">
             <div class="heading">Select Playing 9</div>
            

            {/* Table and Search */}
            <TableComponent users = {users} setUsers = {setUsers}/>
        </div>
    )
}

export default ListPage;
