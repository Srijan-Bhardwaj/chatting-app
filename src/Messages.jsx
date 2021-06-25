
import React from 'react';
import Style from './Messages.module.css';

const Messages=(props)=>{
    return(
        <>
        <div className={Style.container} style={{alignSelf:(props.sender===true)?'flex-end':'flex-start'}}>
            <div className={Style.wrapper} style={{alignSelf:(props.sender===true)?'flex-end':'flex-start',backgroundColor:(props.sender===true)?'aqua':'lightgrey',borderTopLeftRadius:(props.sender===true)?'5px':'0',borderBottomRightRadius:(props.sender===true)?'0':'5px'}}><div style={{textAlign:(props.sender===true)?'right':'left',color:(props.sender===true)?'blue':'red'}} className={Style.info}>{props.name}</div>{props.text}</div>
            <div className={Style.details} style={{alignSelf:(props.sender===true)?'flex-end':'flex-start'}}>{props.time.toLocaleDateString()} {props.time.toLocaleTimeString()}</div>
        </div>
        </>
    )
}

export default Messages;