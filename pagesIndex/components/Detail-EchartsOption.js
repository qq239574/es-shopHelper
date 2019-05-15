export default function getLineOption1(datalist, keylist) { 
    return {
        animation: true,
        color: ['#fe802f'],
        grid: {
            x: 45,
            x2: 24,
            y: 25,
            y2: 25,
            show: true,
        },
        tooltip: {
            trigger: 'axis',
            show: true
        },
        calculable: false,
        xAxis: [{
            type: 'category',
            data: keylist,
            show: true,
            min: 0
        }],
        yAxis: [{
            type: 'value',
            show: true,
            splitArea: {
                show: true
            },
            min: function (val) {
                return Math.floor(val.min *0.9);
            },
            max: function (val) { 
                return Math.ceil(val.max *1.1);
            }
        }],
        series: [{
            name: '',
            type: 'line',
            // smooth: true,
            symbol: "none",
            data: datalist
        }]
    };
}