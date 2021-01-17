import React, {useState} from "react";
import ListPage from './ListPage'
import SideBar from './Sidebar'
import "./First.css";



const FirstPage = ({users, setUsers, visiblePage, setVisiblePage}) => {

  // const [users,setUsers] = useState([]);


  return (
    <div className="pages">

      
    
      <SideBar users={users} setUsers = {setUsers} visiblePage={visiblePage} setVisiblePage={setVisiblePage}/>

      {/* Listpage */}
      <ListPage users = {users} setUsers = {setUsers}/>
      

    </div>
  );
};

export default FirstPage;
