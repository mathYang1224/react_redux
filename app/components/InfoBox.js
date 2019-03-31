import React from "react";
import {connect} from "react-redux";

class InfoBox extends React.Component{
	constructor({name}){
		super();

	}

	render(){
		return (
			<div className="info_box">
				<h3>产品信息</h3>
				<h4>{this.props.name}</h4>
			</div>
		)
	}
}

export default connect(
	(state)=> {
		return {
			name : state.data.name
		}
	}
)(InfoBox);