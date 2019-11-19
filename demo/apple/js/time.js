var timer = setInterval(function () {
    var shi = new Date().getHours(); // 获取当前小时
    var fen = new Date().getMinutes(); // 获取当前分钟
    var miao = new Date().getSeconds(); // 获取当前秒数
    var end = 10; // 结束小时设定
    if (shi < end) {
        shi = end - shi;
        if (fen == 0) {
            shi = shi;
        } else {
            shi = shi - 1;
        }
    } else if (shi >= end) {
        shi = 24 - (shi - end);
        if (fen == 0) {
            shi = shi;
        } else {
            shi = shi - 1;
        }
    }

    fen = 60 - fen;
    miao = 60 - miao;

    hour.innerText = shi;
    minu.innerText = fen;
    sec.innerText = miao;
}, 1000)