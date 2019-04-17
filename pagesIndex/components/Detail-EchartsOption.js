export default function getLineOption1(datalist) {
    return {
        animation: true,
        color: ['#fe802f'],
        grid: {
            x: 30,
            x2: 24,
            y: 24,
            y2: 24,
            show: true,
        },
        tooltip: {
            trigger: 'axis',
            show:true
        },
        calculable: false,
        xAxis: [{
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            show: true
        }],
        yAxis: [{
            type: 'value',
            show: true,
            splitArea: {
                show: true
            }
        }],
        series: [{
            name: '蒸发量',
            type: 'line',
            smooth: true,
            symbol: "none",
            data: datalist
        }]
    };
}