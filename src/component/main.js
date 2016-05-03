/**
 * Created by Administrator on 2015/11/21.
 */
import React from 'react';
import DropDownList from './dropDownList/gonabe_dropDownList.js'
import Loaddinger from './loaddinger/gonabe_loaddinger.js'
import Accordion from './accordion/gonabe_accordion.js'
let App = React.createClass({
    getInitialState:function(){
        return {loadding:false}
    },
    load:function(){
        this.setState({loadding:true})
    },
    unload:function(){
        this.setState({loadding:false})
    },
    render(){
        var data = [
            {
                status:"plus",
                title:"abc",
                content:(
                    <div style={{width:'500px',height:'500px'}}>
                        <DropDownList width="200"/>
                        <Loaddinger loadding={this.state.loadding}/>
                    </div>
                )
            },{
                status:"add",
                title:"efg",
                content:(
                    <span>123</span>
                )
            }
        ];
        return (
            <div>
                <Accordion  data={data} />
                <div onClick={this.load} style={{width:100,height:100,background:'red',float:'left'}}>加载</div>
                <div onClick={this.unload} style={{width:100,height:100,background:'green',float:'left'}}>取消加载</div>
            </div>
        );
    }
});

React.render(
    <App/>,
    document.body
)

