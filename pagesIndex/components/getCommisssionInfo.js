
function judgeCommissionStatus(info) {
    if (info.status * 1 === 1) { //是分销商
        return 1
    } else if (info.status * 1 === 0) { //待审核 分销商,
        return 0
    } else if (info.status * 1 === -1) { //曾拒绝
        return -1
    } else { //没申请过
        return -2
    }
}

export default function (commission) {
    let status = judgeCommissionStatus(commission)
    let commissionInfo = { //分销商信息
        isCommission: status, //是否分销商，
        registerTime: commission.apply_time, //注册时间
        registerInfo: commission.from, //申请信息

        superDistributor: { //上级分销商
            name: commission.agent_nickname
        },
        beDistributorTime: { //成为分销商时间
            value: commission.become_time
        },
        distributorClass: { //分销商等级
            name: commission.level_name
        },
        accumCommission: { //累计佣金
            value: commission.commission_total
        },
        hadGet: { //已提现佣金
            value: commission.commission_pay
        },
        waitMoney: { //待入账佣金
            value: commission.wait_recorded
        },
        commBill: { //分销订单
            value: commission.commission_order
        },
        subDistributor: { //分销下级
            num: commission.commission_child
        },
        firstSub: { //一级
            num: commission.level1_num,
            distributor: commission.level1_agent_num
        },
        secondSub: { //二级
            num: commission.level2_num,
            distributor: commission.level2_agent_num
        },
        thirdSub: { //三级
            num: commission.level3_num,
            distributor: commission.level3_agent_num
        }
    }
    return commissionInfo;
}