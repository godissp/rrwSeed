/**
 * Created by Administrator on 2015/12/2.
 */
import $ from 'jquery';
export default function(data){
    var filters = this.filters;
    filters.crStatus = [];
    filters.vmNum = [];
    filters.usrId = [];
    $(".crStatus:checked").each(function(i,v){
        filters.crStatus.push($(this).data("status"));
    });
    $(".vmNum:checked").each(function(i,v){
        filters.vmNum.push($(this).data("status"));
    });
    $(".usrId:checked").each(function(i,v){
        filters.usrId.push($(this).data("status"));
    });
    if(filters.crStatus.length){
        data  = data.filter(function(v,i){
            for(var i=0;i<filters.crStatus.length;i++){
                switch (filters.crStatus[i]){
                    case 0:{
                        if(v.comMonitorInfo.showStatus==0)
                            return true;
                        break;
                    }
                    case 1:{
                        if(v.comMonitorInfo.showStatus==1)
                            return true;
                        break;
                    }
                    case 2:{
                        if(v.comMonitorInfo.showStatus==2)
                            return true;
                        break;
                    }
                    case 3:{
                        if(v.comMonitorInfo.showStatus==3)
                            return true;
                        break;
                    }
                    case 4:{
                        if(v.comMonitorInfo.showStatus==4)
                            return true;
                        break;
                    }
                    case 5:{
                        if(v.comMonitorInfo.showStatus==5)
                            return true;
                        break;
                    }
                }
            }
        });
    }
    if(filters.vmNum.length){
        data  = data.filter(function(v,i){
            for(var i=0;i<filters.vmNum.length;i++){
                switch (filters.vmNum[i]){
                    case 11:{
                        if(v.vmNum==0)
                            return true;
                        break;
                    }
                    case 10:{
                        if(v.vmNum>0)
                            return true;
                        break;
                    }
                }
            }
        });
    }
    if(filters.usrId.length){
        data  = data.filter(function(v,i){
            for(var i=0;i<filters.usrId.length;i++){
                switch (filters.usrId[i]){
                    case 20:{
                        if(v.usrId==0)
                            return true;
                        break;
                    }
                    case 22:{
                        if(v.usrId==9999)
                            return true;
                        break;
                    }
                    case 21:{
                        if(v.usrId>0&&v.vmNum<9999)
                            return true;
                        break;
                    }
                }
            }
        });
        data  = data.filter(function(v,i){
            if(v.vmNum>0){
                return false
            }else{
                return true
            }
        });
    }
    return data;
}