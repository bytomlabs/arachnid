import React, { useState, useEffect } from 'react';
import { Icon } from 'antd';

export default function Star({id, title, url, content}) {

  const [isStar, setStar] = useState(false);
  const itemKey = `star_${id}`;
  useEffect(() => {
    setStar(getStatus(itemKey));
  }, []);

  const handleStaring = (e) => {
    e.stopPropagation();
    if(!isStar){
      localStorage.setItem(itemKey, JSON.stringify({title, url, content, unique: id}));
    } else {
      localStorage.removeItem(itemKey);
    }
    setStar(!isStar);
  };
  const getStatus = (key) => {
    const stars = [];
    for(let i = 0, len = localStorage.length; i < len; i++) {
      if(/^star_/.test(localStorage.key(i))){
        stars.push(localStorage.key(i));
      }
    }
    return stars.includes(key);
  }
  return (
    <span onClick={handleStaring}>
      {
        isStar ? <Icon style={{color: '#fba515'}} theme="filled" type="star" /> : <Icon type="star" />
      }
    </span>
  )
}
