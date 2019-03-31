import React from "react";
import {connect} from "react-redux";
import {gotoidx} from "../actions/actions.js";

class SmallPicNavBox extends React.Component{
	constructor({pics,idx,filter}){
		super();
		//总页数，跟store中的pics数组有关系，所以不需要用state周转
		this.pageamount = 0;
		this.filter = filter;
		//信号量
		//当前在哪页
		this.state = {
			"nowpage" : 0  	//根据大图来决定parseInt(idx / 9) 
		};
	}

	componentDidMount(){
		var self = this;
		//绑定事件必须用事件委托！因为构造函数中还没有加载好DOM。
		$(this.refs.ul_nav).delegate("span","click",function(){
			//改变local state
			$(self.refs.ul_box).stop(true).animate({"left" : -263 * $(this).index() } , 500);
			$(this).addClass("cur").siblings().removeClass("cur");
		});
	}

	showul(){
		//数组，图片数组，形如：["6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg","17.jpg","18.jpg","19.jpg","20.jpg","21.jpg","22.jpg","23.jpg","24.jpg","25.jpg","26.jpg","27.jpg","28.jpg","29.jpg","30.jpg"]
		var pics = this.props.pics;
		//准备返回的ul清单
		var uls = [];
		//得到第几页的第几张有cur
		var curi = parseInt(this.props.idx / 9);
		var curj = this.props.idx % 9;

		//遍历ul清单
		for(let i = 0 ; i < this.pageamount ; i++){
			//放入li
			let lis = [];
			for(let j = 0 ; j < 9 && i * 9 + j < pics.length; j++){
				//得到数组中这里的字符串
				var imgurl = pics[i * 9 + j];
				//图片的完整路径
				let src = "images/small/" + imgurl;
				lis.push(
					<li key={j} className={i==curi && j == curj ? "cur" : ""} onClick={()=>{this.props.dispatch(gotoidx(i * 9 + j))}}>
						<img src={src} />
						<div className="mask"></div>
					</li>
				);
			}
			uls.push(<ul key={i}>{lis}</ul>);
		}
		return uls;
	}

	//显示图片小导航条
	showulnav(){
		var spans = [];
		for(var i = 0 ; i < this.pageamount ; i++){
			spans.push(<span key={i}></span>);
		}
		return spans;
	}

	//组件更新之后
	componentDidUpdate(){
 		console.log("componentDidUpdate")
		if(this.filter != this.props.filter){
 			this.setState({ nowpage :0});
 			this.filter = this.props.filter;
   			$(this.refs.ul_box).css({"left" : 0 });
   			return;
		}

 		//得到local state中的当前页，如果不等于全局数组中除以9取整（重新计算了一下）
		if(this.state.nowpage != parseInt(this.props.idx / 9)){
 			this.setState({ nowpage : parseInt(this.props.idx / 9)});
   			$(this.refs.ul_box).stop(true).animate({"left" : -263 * parseInt(this.props.idx / 9) } , 500);
 		}

		$(this.refs.ul_nav).find("span").eq(this.state.nowpage).addClass("cur").siblings().removeClass("cur");
		$(this.refs.ul_box).stop(true).animate({"left" : -263 * parseInt(this.props.idx / 9) } , 500);
 	}

	render(){
 		//设置组件的pages属性，就是一个小信号量。
		//没有用setState。因为组件自己状态和属性有关系，这里写this.setState()就会死循环
		//改变state就会执行render，render了又改变了state…………
		this.pageamount = Math.ceil(this.props.pics.length / 9);

		return (
			<div className="small_pic_nav_box">
				<h3>图片导航</h3>
				<div className="inner" id="small_pic_nav_box">
					<div className="ul_box"  ref="ul_box">
						{this.showul()}
					</div>
				</div>
				<div className="ul_nav" style={{"width" : this.pageamount * 40 - 10}} ref="ul_nav">
					{this.showulnav()}
				</div>
			</div>
		)
	}
}

export default connect(
	(state) => {
		//处理
		if(state.data.pic.length == 0){
			return {
				pics : [],
				idx : 0,
				filter : 0
			}
		}else{
			return {
				pics : state.data.pic[state.album].filter[state.filter].pics,
				idx : state.idx,
				filter : state.filter
			}
		}
	}
)(SmallPicNavBox);