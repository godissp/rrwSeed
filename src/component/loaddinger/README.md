# loaddinger
加载提示组件
import Loaddinger from './loaddinger/gonabe_loaddinger.js'

    <div style={{width:'500px',height:'500px'}} >
        <Loaddinger loadding={this.state.loadding}/>
    </div>

此组件放入需要提示的父组件中，loadding属性控制显示与否。