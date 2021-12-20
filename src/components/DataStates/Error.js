import React from 'react'
const Error = ({ error }) => {
 return (
  <div className="flex  flex-col items-center mt-24">
   <div>
    <img
     className="w-32 h-32 object-contain"
     alt="Error gotten from urql"
    />
   </div>
   <p className="text-xl mt-4">Error : {error.message}</p>
  </div>
 )
}

export default Error
