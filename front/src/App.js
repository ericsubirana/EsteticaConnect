import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Routers from './routers/Routers.js';

function App() {

  const [data, setData] = useState(null);
  useEffect(() => {
    const fuunc = async () => {
      const response = await axios.get('http://localhost:5000/api');
      setData(response.data);
      console.log(response.data);
    };
    fuunc();
  }, [])

  return (
    <>
      <div>
        {data ? data.users.map(user=> <div  key={user} >{user}</div>) : "Loading..." }
      </div>
      <div>
        <Routers/>
      </div>
    </>
    

  )
}

export default App
