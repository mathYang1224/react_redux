//从服务器上得到数据
export const fetchData = () => (dispatch) => {
	$.get("/api/json.json",function(data){
		dispatch({"type" : "FETCHDATA" , "data" : data});
	});
}


//下一张图片
export const goNext = () => {return {"type" : "GONEXT"}}

//上一张图片
export const goPrev = () => {return {"type" : "GOPREV"}}

//去某一张图片
export const gotoidx = (number) => {return {"type" : "GOTOIDX" , "number" : number}}

//去某一个图集
export const gotofilter = (number1,number2) => {return {"type" : "GOTOFILTER" , "number1" : number1 , "number2" : number2}};