/**
 * Created by Administrator on 2015/11/13.
 */
import React from 'react';
import './gonabe_tabs.css'

let Tabs = React.createClass({
    tabClick:function(event){
        Array.prototype.forEach.call(this.refs.items.childNodes,function(v,i){
            if(v.className != "clearfix"){
                v.className = "tabs-title";
            }
        })
        event.currentTarget.className = "tabs-title active";
        var obj = this.props.data[event.currentTarget.dataset.id];
        if(this.props.doSomething){
            this.props.doSomething(obj);
        }
    },
    render: function() {
        var list = this.props.data;
        let items = [];
        for(let i in list){
            let obj = list[i];
            if(i == 0){
                items.push(
                    <li className="tabs-title active" data-id={i} onClick = {this.tabClick}>{obj[this.props.dataMap.name]}</li>
                )
            }else{
                items.push(
                    <li className="tabs-title" data-id={i} onClick={this.tabClick}>{obj[this.props.dataMap.name]}</li>
                )
            }
        }
        return(
            <div className="tabs-panel">
                <ul className="gonabe-tabs-titles" ref="items">
                    {items}
                    <li className="clearfix"></li>
                </ul>
            </div>
        )
    }
});

module.exports = Tabs ;
