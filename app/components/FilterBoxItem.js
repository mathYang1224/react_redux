import React from "react";
import {connect} from "react-redux";
import {gotofilter} from "../actions/actions.js"

class FilterBoxItem extends React.Component{
	constructor({item,album,filter,cur,index}){
		super();
	}

	show(){
		if(this.props.item["filter-name"] == "颜色"){
			return this.props.item.filter.map((thefilter,index)=>{
				let classname = ["color_choose"];
				//判定加cur 
				if(this.props.cur && index == this.props.filter){
					classname.push("cur");
				}
				return <a onClick={()=>{this.props.dispatch(gotofilter(index,this.props.albumindex))}} key={index} className={classname.join(" ")} style={{"backgroundColor":thefilter["type-name"]}}></a>
			});
		}else{
			return this.props.item.filter.map((thefilter,index)=>{
				return <a onClick={()=>{this.props.dispatch(gotofilter(index,this.props.albumindex))}} key={index} className={(this.props.cur && index == this.props.filter)? "cur" : ""}>{thefilter["type-name"]}</a>
			});
		}
	}

	render(){
		return (
			<div>
				<div className="filter_name">
					{this.props.item["filter-name"]}
					 
				</div>
				<div className="filter_types">
					{
						this.show()
					}
				</div>
			</div>
		)
 	}
}

export default FilterBoxItem;