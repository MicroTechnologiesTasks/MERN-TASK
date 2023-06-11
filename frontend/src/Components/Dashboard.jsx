import React from 'react'
import Sidebar from './Sidebar'
import Navi from './Navi'


function Dashboard() {
  return (
   <>
<Navi />
   <Sidebar/>
   <div>
    <h1 style={{textAlign:"center"}}></h1>
   </div>
   </>

   
  )
}

export default Dashboard