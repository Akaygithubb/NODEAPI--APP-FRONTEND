import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import {context, server} from "../main";
import toast from 'react-hot-toast';
import Todoitem from '../components/Todoitem';
import { Navigate } from 'react-router-dom';

const Home = () => {


const[title,settitle]=useState("");
const[description,setdescription]=useState("");
const[loading,setloading]=useState(false);
const[tasks,settasks]=useState([]);
const[refresh,setrefresh]=useState(false);
const {isAuthenticated}=useContext(context);



const Updatehandler=async(id)=>{


try {
  const {data}=await axios.put(`${server}/task/${id}`,{},{
    withCredentials:true
  })

  toast.success(data.message);
  setrefresh(prev=>!prev)
  
} catch (error) {
  toast.error(error.response.data.message);
}


}

const Deletehandler=async (id)=>{

  try {
    const {data}=await axios.delete(`${server}/task/${id}`,{
      withCredentials:true
    })
  
    toast.success(data.message);
    setrefresh(prev=>!prev)
  
  } catch (error) {
    toast.error(error.response.data.message);
  }


}


const SubmitHandler=async(e)=>{
  e.preventDefault();
try {
  setloading(true);

  const {data}=await axios.post(`${server}/task/new`,{
    title,description
  },{
    withCredentials:true,
    headers:{
     "Content-Type":"application/json"
    }
  })
settitle("")
setdescription("")
  toast.success(data.message);
  setloading(false);
  setrefresh(prev=>!prev)
  
} catch (error) {
  toast.error(error.response.data.message)
  setloading(false);
}
}

useEffect(() => {
  
axios.get(`${server}/task/all`,{
  withCredentials:true
}).then(res=>{
   settasks(res.data.tasks)
}).catch((e)=>{
  toast.error(e.response.data.message)
})

}, [refresh])


if (!isAuthenticated) {
  return <Navigate to={"/login"} />;
}



  return (
    <div className="container">
      <div className='login'>
        <section>
            <form onSubmit={SubmitHandler}>
            <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            required
          />
            <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            required
          />
         
                 <button disabled={loading} type='submit'>Add Task</button>

            </form>
        </section>
    </div>
    <section className="todoContainer">
      {
        tasks.map(i=>(
          <Todoitem title={i.title} description={i.description}
          isCompleted={i.isCompleted} Updatehandler={Updatehandler} Deletehandler={Deletehandler}
          id={i._id} key={i._id}/>
        ))
      }
      </section>
    </div>
  )
}

export default Home