import React, {useEffect, useState} from 'react'
import axios from 'axios';

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
    <div>
      {data ? data.users.map(user=> <div  key={user} >{user}</div>) : "Loading..." }
    </div>
  )
}

export default App
