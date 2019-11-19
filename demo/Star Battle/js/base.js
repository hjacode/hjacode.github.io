let $ = (elem) => { return document.querySelector(elem) };
let $$ = (elems) => { return document.querySelectorAll(elems) };

// 通用设置类
class Base {
    constructor() {
        // 主飞船动画
        this.mainShipAnimation();
        // 启用开关声音事件
        this.sound = "end";
        this.audio();
        // 暂停开始
        this.pauseStart = true;
        this.gamePauseStart();

    }
    // 主飞船动画
    mainShipAnimation() {
        let index = 1;
        // 每隔一段时间换下图片
        setInterval(function () {
            for (let mainShipImg of $$(".mainShip-img")) {
                index = index >= 6 ? 1 : ++index;
                mainShipImg.src = `./images/my${index}.png`;
            }
        }, 500)
    }
    // 开关声音事件
    audio() {
        // 开关界面声音事件
        $("#audio-btn").onclick = () => {
            // 为真改为静音改图片,为假反之
            if (this.sound === "on") {
                $("#bg-music").pause();
                $("#audio-btn").style.animationName = "audioOff";
                $("#audio-btn>i").style.animationName = "audioLineOff";
                this.sound = "end";
            } else {
                $("#bg-music").play();
                $("#audio-btn").style.animationName = "audioOn";
                $("#audio-btn>i").style.animationName = "audioLineOn";
                this.sound = "on";
            }
        }
    }
    // 生成射击音效
    musicShoot() {
        if (this.sound === "on") {
            let audio = document.createElement("audio");
            audio.src = "./mp3/shoot.mp3";
            audio.autoplay = "autoplay";
        }
    }
    // 生成摧毁音效
    musicDestroyed() {
        if (this.sound === "on") {
            let audio = document.createElement("audio");
            audio.src = "./mp3/destroyed.mp3";
            audio.autoplay = "autoplay";
        }
    }
    // 随机数
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // 缓动动画
    easeAnimation(ele, obj, fn) {
        clearInterval(ele.timerId);
        ele.timerId = setInterval(function () {
            let flag = true;
            for (let key in obj) {
                let target = obj[key];
                // 1.拿到元素当前的位置
                let style = getComputedStyle(ele);
                let begin = parseInt(style[key]) || 0;
                // 2.定义变量记录步长
                // 公式: (结束位置 - 开始位置) * 缓动系数(0 ~1)
                let step = (target - begin) * 100;
                // 3.计算新的位置
                begin += step;
                if (Math.abs(Math.floor(step)) > 1) {
                    flag = false;
                } else {
                    begin = target;
                }
                // 4.重新设置元素的位置
                ele.style[key] = begin + "px";
            }
            if (flag) {
                clearInterval(ele.timerId);
                fn && fn();
            }
        }, 10);
    }
    // 暂停游戏
    gamePauseStart() {
        $("#pause").onclick = () => {
            if (this.pauseStart) {
                $("#pause").style.background = `url("images/start.png")`;
                this.pauseStart = false;
            } else {
                $("#pause").style.background = `url("images/pause.png")`;
                this.pauseStart = true;
            }
        }
    }
}