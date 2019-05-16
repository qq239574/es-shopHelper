/**
 * 获取当前日期之前，之后几天的日期
 */
export function getDate(before) {
    var time = new Date();
    time.setDate(time.getDate() + before); //获取Day天后的日期 
    var y = time.getFullYear();
    var m = time.getMonth() + 1; //获取当前月份的日期 
    var d = time.getDate();
    m = m > 9 ? m : '0' + m;;
    d = d > 9 ? d : '0' + d;
    return y + "-" + m + "-" + d;
}
/***
 * 获取两段时间间隔
 * 
 */
export function GetDateDiff(startDate, endDate) {
    var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
    var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
    var dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
    return dates;
}
/***
 * 获取两段时间间隔
 * 
 */
export function GetDateDiffNoAbs(startDate, endDate) {
    var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
    var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
    var dates = (startTime - endTime) / (1000 * 60 * 60 * 24);
    return dates;
}