# dropDownList

自定tab页组件
example :
<Tabs data={this.props.titleList} dataMap={{"name":"areaName"}} doSomething={this.changeRegion}/>


data：为一个数组类型，初始化tab项，name为显示字段
dataMap:映射数据字段
doSomething：为选中某一项之后的回调函数，此回调函数会自动传入obj参数，obj对应于data数组中选中的某一项