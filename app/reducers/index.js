let getInitialState = () => {
	return {
		"album" : 0,	//当前所在的相册类型0、1、2
		"filter" : 0,	//当前所在的相册编号
		"idx" : 0,		//当前所在图片序号，小序号，不是全局大排队
		"amount" : 0,	//总图片张数
		"data" : {
			"name" : "",
			"picture-index" : 0,
			"pic" : [
				 
			]
		}
	}
};

//计算图片总张数
let caltPicAmount = (data) => {
	let amount = 0;
	data.pic.forEach(function(pic){
		pic.filter.forEach(function(filter){
			amount += filter.pics.length;
		});
	});
	return amount;
}

//这是REDUCER：
export default (state = getInitialState() , action) => {
	switch(action.type){
		case "FETCHDATA" :
			return {
				...state,
				"amount" : caltPicAmount(action.data),
				"data" : action.data
			}
		case "GONEXT" :
			//判定是不是当前filter中的最后一张
			if(state.idx == state.data.pic[state.album].filter[state.filter].pics.length - 1){
				//判定是不是当前album中的最后一张
				if(state.filter == state.data.pic[state.album].filter.length - 1){
					//判定是不是最后一个album
					if(state.album == state.data.pic.length - 1){
						return {
							...state,
							"idx" : 0,
							"filter" : 0,
							"album" : 0
						}
					}
					return {
						...state,
						"idx" : 0,
						"filter" : 0,
						"album" : state.album + 1
					}
				}

				return {
					...state,
					"idx" : 0,
					"filter" : state.filter + 1
				}
			}

			return{
				...state,
				"idx" : state.idx + 1
			}
		case "GOPREV" : 
			//判断是不是已经是filter的头了
			if(state.idx == 0){
				//判断是不是已经是album的头了
				if(state.filter == 0){
					if(state.album == 0){
						let lastAlbumNumber = state.data.pic.length - 1 ;
						let lastAlbumLastFilterNumber = state.data.pic[lastAlbumNumber].filter.length - 1;
						return {
							...state,
							"album" : lastAlbumNumber,
							"filter" : lastAlbumLastFilterNumber,
							"idx" : state.data.pic[lastAlbumNumber].filter[lastAlbumLastFilterNumber].pics.length - 1
						}
					}

					let prevAlbumLastFilterNumber = state.data.pic[state.album - 1].filter.length - 1;
					return {
						...state,
						"album" : state.album - 1,
						"filter" : prevAlbumLastFilterNumber,
						"idx" : state.data.pic[state.album - 1].filter[prevAlbumLastFilterNumber].pics.length - 1
					}
				}
				return {
					...state,
					"filter" : state.filter - 1,
					"idx" : state.data.pic[state.album].filter[state.filter - 1].pics.length - 1
				}
			}
			return {
				...state,
				"idx" : state.idx - 1
			}
		case "GOTOIDX" : {
			return {
				...state,
				"idx" : action.number
			}
		}
		case "GOTOFILTER" : {
			return {
				...state,
				"filter" : action.number1,
				"album" : action.number2,
				"idx" : 0
			}
		}
	}
	return state;
}