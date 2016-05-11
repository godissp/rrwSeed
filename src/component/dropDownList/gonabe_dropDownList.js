/**
 * Created by Administrator on 2015/11/13.
 */
import React from 'react';
import './gonabe_dropDownList.css'

let DropDownList = React.createClass({
    getInitialState:function(){
        return {showList:false}
    },
    hideList:function(e){
        let icon = this.refs.icon;
        let iconRect = icon.getBoundingClientRect();
        if(e.clientX<iconRect.left||e.clientX>iconRect.left+iconRect.width||e.clientY<iconRect.top||e.clientY>iconRect.top+iconRect.height){
            this.hide();
        }
    },
    componentDidMount:function(){
        if(document.addEventListener){
            document.body.addEventListener("click",this.hideList)
        }else{
            document.body.attachEvent("click",this.hideList); 
        }
    },
    componentWillUnmount:function(){
        if(document.removeEventListener){
            document.body.removeEventListener("click",this.hideList)
        }else{
            document.body.detachEvent("click",this.hideList); 
        }
        
    },
    componentDidUpdate(){
        this.adjust();
    },
    adjust:function(){
        let list = this.refs.list;
        let parent = this.refs.main;
        let bodyRect = document.body.getBoundingClientRect();
        let listRect = list.getBoundingClientRect();
        let parentRect = parent.getBoundingClientRect();
        if(parentRect.top+parentRect.height+listRect.height>bodyRect.height){
            list.style.position="fixed";
            list.style.top=parentRect.top-listRect.height+1+"px";
            list.style.left=this.refs.main.getBoundingClientRect().left+"px";
        }else{
            list.style.position="fixed";
            list.style.top=parentRect.top+parentRect.height-1+"px";
            list.style.left=parent.getBoundingClientRect().left+"px";
        }
    },
    toggle:function(event){
        this.setState({showList:this.state.showList?false:true});
        //event.stopPropagation()
    },
    hide:function(){
        this.setState({showList:false});
    },
    select:function(event){
        this.refs.panel.value = event.currentTarget.innerHTML;
        //this.toggle();
        var index = event.currentTarget.attributes["data-index"].nodeValue;
        var item = this.props.data[index];
        if(this.props.callback){
            this.props.callback(index,item);
        }
    },
    render: function() {
        var width = this.props.width?this.props.width:200;
        var data = this.props.data||[];
        var list = data.map(function(v,i){
            return(
                <li onClick={this.select} data-index={i}>{v.text||""}</li>
            )
        }.bind(this))
        return(
            <div className="dropDwonList" style={{width:width}} ref="main">
                <div className="dropDwonList-main">
                    <input type="text" className="dropDwonList-input" style={{width:width-25}} ref="panel" defaultValue={data[0]?data[0].text:""}/>
                    <div className="dropDwonList-icon" onClick={this.toggle} ref="icon"></div>
                </div>
                <ul className="dropDwonList-list" ref="list" style={{width:width,display:this.state.showList?"block":"none"}}>
                    {list}
                </ul>
            </div>
        )
    }
});

module.exports = DropDownList;
