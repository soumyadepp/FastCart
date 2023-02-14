import React from 'react'
import styles from './Button.module.css';


type ButtonPropType = {
    text:string;
    outlined?:boolean;
    full?: boolean;
    fullRounded?:boolean;
    handleClick: (e:React.MouseEvent) => void;
}

export default function Button(props:ButtonPropType) {
  const {text,full,fullRounded,outlined,handleClick} = props;
  return (
    <button className={`${styles.commonButton} ${outlined? styles.outlined:''} ${full? styles.full : ''} ${fullRounded === true? styles.rounded:''} `} onClick={handleClick}>{text}</button>
  )
}
