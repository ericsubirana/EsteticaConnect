import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Routers from './routers/Routers.js';
import "./App.css";

function App() {

  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   const fuunc = async () => {
  //     const response = await axios.get('http://localhost:5000/api');
  //     setData(response.data);
  //     console.log(response.data);
  //   };
  //   fuunc();
  // }, [])

  return (
    <>
      <div className='app'>
        <Routers/>
      </div>
    </>
  )
}

export default App
