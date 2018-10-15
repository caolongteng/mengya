import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { hot } from "react-hot-loader";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import Posts from "./Posts"; //文章列表
import Article from "./Article"; //单独一篇文章
import Setter from "./Setter"; //设置用户资料
import People from "./People"; //个人主页
import Collect from "./Collect"; //一个收藏夹收藏的所有文章
import Editor from "./Editor"; //富文本编辑器，一般是webpack编译是两个入口分开，为了简单就全部单入口应用了
import Login from "./Login"; //点击登录两个入口，一种是直接路由改变，一种是追踪监听观察值loginPath
import Subscr from "./Subscr"; //设置用户关注标签

import Header from "@components/Header"; //页面头

//NO Portals API，全局共享且Modal和Hove内部需要监听 observable
import Message from "@components/Message"; //页面全局消息提示
import Modal from "@components/Modal";
import Hove from "@components/Hove";

@inject("Appstore")
@observer
class App extends Component {
    static propTypes = {
        Appstore: PropTypes.object
    };
    render() {
        if(this.props.Appstore.app.error!==null) return <Redirect to={{pathname:'/404',state:{ error: this.props.Appstore.app.error }}}/>;
        return (
            <React.Fragment>
                <Header />
                <Switch>
                    <Route exact path="/" component={Posts} />
                    <Route path="/search" component={Posts} />
                    <Route path="/hot" component={Posts} />
                    <Route path="/about" component={Posts} />
                    <Route path="/p/:id/" component={Article} />
                    <Route path="/setter/:path" component={Setter} />
                    <Route path="/people/:id/:path" component={People} />
                    <Route path="/collect/:id/" component={Collect} />
                    <Route path="/write" component={Editor} />
                    <Route path="/subscr/:path" component={Subscr}/>
                    <Route render={()=>{
                        return <Redirect to={{pathname:'/404',state:{ error:window.location.href}}}/>;
                    }} />
                </Switch>
                <Message />
                <Login />
                <Modal/>
                <Hove/>
            </React.Fragment>
        );
    }
}
export default hot(module)(App);