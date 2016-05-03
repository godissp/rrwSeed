# dropDownList

自定义下拉框
example:
<DropDownList width="200" data={oprationData} callback={this.operation}></DropDownList>

width:为组件宽度
data：为一个数组类型，数组中text属性为显示字段
callback：为选中某一项之后的回调函数，此回调函数会自动传入index和item参数，item对应于data数组中选中的某一项