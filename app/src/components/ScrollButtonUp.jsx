import React, {useState} from 'react';
  
export default function ScrollButtonUp() { 
  
  const [visible, setVisible] = useState(false) 
  
  const toggleVisible = () => { 
    const scrolled = document.documentElement.scrollTop; 
    if (scrolled > 300){ 
      setVisible(true) 
    }  
    else if (scrolled <= 300){ 
      setVisible(false) 
    } 
  }; 
  
  function scrollToTop(){ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    }); 
  }; 
  
  window.addEventListener('scroll', toggleVisible); 
  
  return ( 
     <button id='toTopBtn' onClick={scrollToTop}  
     style={{display: visible ? 'block' : 'none'}}>↑</button> 
  ); 
} 
  
 