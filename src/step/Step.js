import React from 'react';
import '../css/step.css';
class Line extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let self = this;
		let active = this.props.active;
		let value = 0;//进度条没有加载
		if(active == 1) {//进度条加载完成
			value = 100;
		}
		return(
			<div className="ant-progress-line">
				<div>
					<div className="ant-progress-outer">
						<div className="ant-progress-inner">
							<div style={{width: value+"%"}} className="ant-progress-bg">
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class Circle extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let content = this.props.content;
		let number = this.props.number;
		let active = this.props.active;
		let self = this;
		return (
			<div className="ant-steps-head">
				<div className="ant-steps-head-inner" style={active ? {backgroundColor: "#2db7f5"} : {backgroundColor: "#c1c1c1"}} onClick={function(){self.props.preStep(number)}}>
					<span className="ant-steps-icon"> {number+1} </span>
				</div>
				<div className="ant-steps-text" style={active ? {color: "#2db7f5"} : {color: "#c1c1c1"}}>
					{content}
				</div>
			</div>
		);
	}
}

class Step extends React.Component {
	constructor(props) {
		super(props);
	    this.state = {
	       curStep: 0,//当前正操作哪一步
	       maxStep: 0,//执行最远的一步
	    };

	    this.nextStep = this.nextStep.bind(this);
	    this.preStep = this.preStep.bind(this);
  	}

  	nextStep(){
  		let self = this;
  		let curStep = this.state.curStep;
  		let maxStep = this.state.maxStep;
  		this.setState({
  			curStep: curStep+1,
  			maxStep: maxStep <= curStep ? curStep+1 : maxStep,
  		});
  	}

  	preStep(toStep){
  		let maxStep = this.state.maxStep;
  		let curStep = this.state.curStep;
  		if(toStep > maxStep || toStep == curStep) return;
  		this.setState({
  			curStep: toStep,
  		});

  		if(this.props.mainPreStep)
  			this.props.mainPreStep(toStep);
  	}

	render(){
		let self = this;
		let contents = self.props.contents;
		let steps = contents.map(function(content, index){
			let activeCircle = true;
			let activeLine = false;
			if(self.state.curStep > 0 && self.state.curStep-1 >= index) activeLine = true;
			if(index > self.state.curStep) activeCircle = false;
			if(index == contents.length-1) {
				if(index == 0) {
					return (
						<div className="step-main-div">
							<Circle active={activeCircle} content={content} number={index} preStep={self.preStep}/>
						</div>
					);
				} else {
					return (
						<div className="step-main-div step-main-div-move">
							<Circle active={activeCircle} content={content} number={index} preStep={self.preStep}/>
						</div>
					);
				}
			} else if(index == 0) {
				return ( 
					<div className="step-main-div">
						<Circle active={activeCircle} content={content} number={index} preStep={self.preStep}/>
						<Line active={activeLine}/>
					</div>
				);
			} else {
				return (
					<div className="step-main-div step-main-div-move">
						<Circle active={activeCircle} content={content} number={index} preStep={self.preStep}/>
						<Line active={activeLine}/>
					</div>
				);
			}
		});
		
		return (
			<div style={{width: "100%"}}> 
				{
					steps
				}
			</div>
		);
	}
}

module.exports = Step;