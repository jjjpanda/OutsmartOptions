import React from 'react';

class HomePage extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
        <div style={{paddingLeft:'60px', paddingTop:'20px'}}>
            <h1 key = "mainTitle" >Outsmart Options</h1>
            <br />
            <div> 
                What up Youtube. 
                <br />
                You're probably here for the calculator, 
                <br />
                so just click the calculator button at the side.
                <br />
            </div>
        </div>
    )}
}

export default HomePage