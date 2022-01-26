import React, {useEffect, useRef} from 'react';
import { init } from 'ityped';


export default function AnimatedTyping() {
    const textRef = useRef();

    useEffect(() => {
        init(textRef.current, { 
            showCursor: true,
            backDelay:1500,
            backSpeed: 60, 
            strings: ['Dubble click on map to post new restaurant']
        });
    }, [])
    
    return (
        <div>
          <h4 className='text-center' style={{color:"red"}}><span ref={textRef}></span></h4> 
        </div>
    )
}
