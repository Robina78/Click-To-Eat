import React from 'react';
import { Container } from "react-bootstrap";
import "./HeaderTabs.css";

export default function HeaderTabs(props) {    

    return (
        <Container>
           <HeaderButton
            text="Delivery"
            btnColor="slateblue"
            textColor="white"            
            activeTab={props.activeTab}
            setActiveTab={props.setActiveTab}
           />
           <HeaderButton
            text="Pickup"
            btnColor="white"
            textColor="slateblue"
            activeTab={props.activeTab}
            setActiveTab={props.setActiveTab}
           />  
        </Container>
    )
}

const HeaderButton = (props) => {
    return (
        <div>
      <button className="btn" style={{
        backgroundColor: props.activeTab === props.text ? "slateblue" : "white",
        width:120,
        height:40,       
        borderRadius: 30,
        color: props.activeTab === props.text ? "white": "slateblue",
        fontSize: 16,
        fontWeight: "900",
        marginBottom:'20'       
        }}
        onClick={() => props.setActiveTab(props.text)}
      >{props.text}
      </button>
    </div>
    )
    
}
