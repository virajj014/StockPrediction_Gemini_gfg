import React from 'react'
import './Result.css'
const Result = ({result}) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: result }} className='resultdiv'/>
  )
}

export default Result