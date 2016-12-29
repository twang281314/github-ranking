import React from 'react';
import Step from './Step';

export default class MainDiv extends React.Component{
	constructor(props){
		super(props);
		this.nextStep = this.nextStep.bind(this);
	}

	nextStep(){
		this.refs.myStep.nextStep();
	}

	render(){
		return (
			<div>
				<div style={{marginTop: "100px", width: "70%", display: "inline-block"}}>
					<Step contents={["first", "second", "third", "forth"]} ref="myStep"/>
				</div>
				<div style={{display: "inline"}}>
					<a href="javascript:void(0)" onClick={this.nextStep}>next</a>
				</div>
			</div>
		);
	}
}