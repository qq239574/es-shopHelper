function fillArr(list) {
    return list.map(item => '')
}
const common = {
    animation: true,
    color: ['#fff'],
    grid: {
        x: 0,
        x2: 0,
        y: 0,
        y2: 0,
        // show:false
    },
    calculable: false,
    yAxis: [{
        type: 'value',
        show: false,
        splitArea: {
            show: true
        },
        min: function (val) { 
            return Math.floor(val.min - Math.ceil(0.1 * (val.max-val.min)));
        },
        max: function (val) {
            return val.max * 1.1;
        }
    }],
};
export function getLineOption1(datalist) {
    return Object.assign({}, common, {
        xAxis: [{
            type: 'category',
            data: fillArr(datalist),
            show: false
        }],
        series: [{
            name: '',
            type: 'line',
            smooth: true,
            symbol: "none",
            data: datalist
        }]
    });
}
export function getLineOption2(datalist) {
    return Object.assign({}, common, {
        xAxis: [{
            type: 'category',
            data: fillArr(datalist),
            show: false
        }],
        series: [{
            name: '',
            type: 'line',
            smooth: true,
            symbol: "none",
            data: datalist
        }]
    });
}
export function getLineOption3(datalist) {
    return Object.assign({}, common, {
        xAxis: [{
            type: 'category',
            data: fillArr(datalist),
            show: false
        }],
        series: [{
            name: '',
            type: 'line',
            smooth: true,
            symbol: "none",
            data: datalist
        }]
    });
}
export function getLineOption4(datalist) {
    return Object.assign({}, common, {
        xAxis: [{
            type: 'category',
            data: fillArr(datalist),
            show: false
        }],
        series: [{
            name: '',
            type: 'line',
            smooth: true,
            symbol: "none",
            data: datalist
        }]
    });
}