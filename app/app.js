import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore , applyMiddleware} from "redux";
import reducer from "./reducers/index.js";
import Main from "./components/Main.js";
import { createLogger } from 'redux-logger';
import thunk from "redux-thunk";

//任何对state的改变之前都会顺序执行中间件。
let store = createStore(reducer,applyMiddleware(createLogger(),thunk));

render(
	<Provider store={store}>
		<Main></Main>
	</Provider>
	,
	document.getElementById("container")
)