import React, { useState } from 'react'
import './App.css'
import FirstPage from './components/FirstPage';
import NoUsers from './components/NoUsers';
import SecondPage from './components/SecondPage';
const App = () => {

  const [visiblePage, setVisiblePage] = useState(true);

  const [users, setUsers] = useState([]);
  // const [textButton,setTextButton] = useState("Start");

  // const showSecond = () => {
  //   setVisiblePage(!visiblePage);
  //   {visiblePage ? setTextButton("Back"): setTextButton("Start")}
  // }
  return (
    <div className="app">
      {/* First Page */}

      {console.log("APP USER: ", users)

      } {/* Second Page */}
      {visiblePage ? <FirstPage users={users} setUsers={setUsers} visiblePage={visiblePage} setVisiblePage={setVisiblePage} /> :

        (users.length > 0 ?

          <SecondPage users={users} visiblePage={visiblePage} setVisiblePage={setVisiblePage} /> : <NoUsers setVisiblePage={setVisiblePage} />)

      }

      {/* <button onClick={showSecond}>{textButton}</button> */}
    </div>
  )
}

export default App;
