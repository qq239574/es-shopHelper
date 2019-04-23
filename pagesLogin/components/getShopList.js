function judgeState(status, is_checked) {
    function check() { 
        if (status == 0) { //状态(0关闭 1正常 -1已过期 -2未购买套餐)
            return {
                num: 1,
                text: '已打烊'
            }; //已打烊
        } else if (status == 1) { //1正常
            return {
                num: 0,
                text: '营业中'
            }; //营业中
        } else if (status == -1) { // -1已过期 
            return {
                num: 2,
                text: '已过期'
            }; //已过期
        } else if (status == -2) { //-2未购买套餐
            return {
                num: 5,
                text: '未购买'
            }; //营业中
        }
    }

    if (is_checked == 1) { //是否审核(1已审 0未审核 -1弃审)
        return check();
    } else if (is_checked == 0) { //0未审核
        return {
            num: 3,
            text: '审核中'
        }
    } else if (is_checked == -1) { //-1弃审
        return {
            num: 4,
            text: '弃审'
        }
    }

}
export default function (list) {
    return list.map(item => {
        let tmp = judgeState(item.status, item.is_checked);
        return {
            title: item.name,
            left: item.days + '天后到期',
            status: tmp.num,
            statusText: tmp.text,
            img: item.logo || '/static/img/global/tmpAct.png',
            shopInfo:item
        }
    })
}