import React from "react";
import {connect} from "react-redux";
import FilterBoxItem from "./FilterBoxItem.js";

class FilterBox extends React.Component{
	constructor({pic,album,filter}){
		super();

	}

	render(){
		return (
			<div className="filter_box">
				<h3>图片筛选</h3>
				
				<div className="filter" id="filter_box">
					<ul>
						{
							this.props.pic.map((item,index)=>{
								return <li key={index}>
											<FilterBoxItem 
												item={item} 
												album={this.props.album}
												filter={this.props.filter}
												cur={index==this.props.album}
												dispatch = {this.props.dispatch}
												albumindex = {index}
												></FilterBoxItem>
								</li>
							})
						}
					</ul>
				</div>
			</div>
		)
	}
}

export default connect(
	(state)=> {
		return {
			pic : state.data.pic,
			album : state.album,
			filter : state.filter
		}
	}
)(FilterBox);