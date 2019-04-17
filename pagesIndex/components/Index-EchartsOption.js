function fillArr(list) {
    return list.map(item => '')
}
export function getLineOption1(datalist) {
    return {
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
        xAxis: [{
            type: 'category',
            data: fillArr(datalist),
            show: false
        }],
        yAxis: [{
            type: 'value',
            show: false,
            splitArea: {
                show: true
            }
        }],
        series: [{
            name: '',
            type: 'line',
            smooth: true,
            symbol: "none",
            data: datalist
        }]
    };
}
export function getLineOption2(datalist) {
    return {
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
        xAxis: [{
            type: 'category',
            data: fillArr(datalist),
            show: false
        }],
        yAxis: [{
            type: 'value',
            show: false,
            splitArea: {
                show: true
            }
        }],
        series: [{
            name: '',
            type: 'line',
            smooth: true,
            symbol: "none",
            data: datalist
        }]
    };
}
export function getLineOption3(datalist) {
    return {
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
        xAxis: [{
            type: 'category',
            data: fillArr(datalist),
            show: false
        }],
        yAxis: [{
            type: 'value',
            show: false,
            splitArea: {
                show: true
            }
        }],
        series: [{
            name: '',
            type: 'line',
            smooth: true,
            symbol: "none",
            data: datalist
        }]
    };
}
export function getLineOption4(datalist) {
    return {
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
        xAxis: [{
            type: 'category',
            data: fillArr(datalist),
            show: false
        }],
        yAxis: [{
            type: 'value',
            show: false,
            splitArea: {
                show: true
            }
        }],
        series: [{
            name: '',
            type: 'line',
            smooth: true,
            symbol: "none",
            data: datalist
        }]
    };
}