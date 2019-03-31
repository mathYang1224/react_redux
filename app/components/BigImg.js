import React from "react";
import {connect} from "react-redux";
import {goNext,goPrev} from "../actions/actions.js";

class BigImg extends React.Component{
	constructor({}){
		super();

	}

	render(){
		if(!this.props.img){
			return <div></div>
		}

		return (
			<div className="big_pic">
				<div className="inner">
					<img src={"images/big/" + this.props.img} id="big_img" />
					<div className="leftBtn" id="leftBtn" onClick={()=>{this.props.dispatch(goPrev())}}></div>
					<div className="rightBtn" id="rightBtn" onClick={()=>{this.props.dispatch(goNext())}}></div>
				</div>
			</div>
		)
	}
}

export default connect(
	(state)=> {
		if(state.data.pic.length == 0){
			return {
				img : null,
				idx : 0
			}
		}else{
			return {
				img : state.data.pic[state.album].filter[state.filter].pics[state.idx],
				album : state.album,
				filter : state.filter,
				idx : state.idx
			}
		}
	}
)(BigImg);