import React from 'react'
import Label from './Label'
//#rfce
function TopHeader() {

    const lbl = "Large-Language Model Evaluation Platform"
    const classes = "my-5 text-5xl font-semibold  bg-white"
  return (
    <div className='text-center'>
        <Label
        className={classes}
        text={lbl}/>
    </div>
  )
}

export default TopHeader