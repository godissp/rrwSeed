/**
 * Created by Administrator on 2015/11/13.
 */
import React from 'react';
import './gonabe_accordion.css'

let Tabs = React.createClass({
    //    以下下为react生命周期方法
    //    getInitialState:function(){},
    //    componentDidMount:function(){},
    //    componentWillReceiveProps: function(nextProps) {},
    //    componentWillUpdate:function(newProps,newState){},
    changeStatus:function(e){
        var list = this.state.list;
        var oldStatus = list[e.currentTarget.dataset.id].status;
        var list = list.map(function(v,i){
            v.status = "add";
            return v
        });
        if(oldStatus == "add"){
            list[e.currentTarget.dataset.id].status = "plus";
        }
        if(this.props.doSomething){
            this.props.doSomething(list[e.currentTarget.dataset.id]);
        }
        this.setState({list:list})
    },
    getInitialState:function(){
        var list = this.props.data||[];
        return {list:list}
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({list:nextProps.data})
    },
    render: function() {
        var listDom = this.state.list.map(function(v,i){
            return (
                <div className="accordion-item">
                    <div className="accordion-item-title" data-id={i} onClick={this.changeStatus}>
                        {v.title}
                        <div className={"accordion-item-title-"+v.status} ></div>
                    </div>
                    <div className="accordion-item-content" style={{display:v.status=="add"?"none":"block"}}>
                        {v.content}
                        <div className="clearfix"></div>
                    </div>
                </div>
            )
        }.bind(this))
        return(
            <div className="accordion-panel">
                {listDom}
            </div>
        )
    }
});

module.exports = Tabs ;
