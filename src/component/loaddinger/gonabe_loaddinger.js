/**
 * Created by Administrator on 2015/11/13.
 */
import React from 'react';
import './gonabe_loaddinger.css'

let Loadinger = React.createClass({
    componentWillUpdate:function(nextProps,nextState){
        var parentNode = this.refs.main.getDOMNode().parentNode;
        if(nextProps.loadding){
            parentNode.style.position = 'relative';
        }else{
            parentNode.style.position = '';
        }

    },
    render: function() {
        return(
            <div className="loaddinger-mask" style={{display:this.props.loadding?'block':'none'}} ref="main">
               <span className="loaddinger-message"></span>
            </div>
        )
    }
});

module.exports = Loadinger ;
