import React from 'react'

const Todoitem = ({title,description,isCompleted,Updatehandler,Deletehandler,id}) => {
  return (
    <div className='todo'>
        <div>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
        <div>
          <input onChange={()=>Updatehandler(id)} type="checkbox" checked ={isCompleted} />
          <button onClick={()=>Deletehandler(id)} className='btn'>DELETE</button>
        </div>
    </div>
  )
}

export default Todoitem