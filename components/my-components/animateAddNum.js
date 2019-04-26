export default function () { //数字累加效果
    let bar = '';
    let cachetime = 0;
    let that = this;
    let maxTime = 1500; //2s
    let cachenum = 0;
    let gap = 0;
    let rate = 0;
    this.start = function (num, fun) {

        bar = requestAnimationFrame(function (time) {
            cachetime = cachetime == 0 ? time : cachetime;
            gap = time - cachetime;
            cachetime = time;
            rate = gap / maxTime * num; //比例
            cachenum = cachenum + rate;
            if (cachenum < num) {
                fun(cachenum)
                that.start(num, fun);
            } else {
                fun(num)
                cancelAnimationFrame(bar);
            }

        })

    }
}