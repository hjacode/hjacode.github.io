class Pipe {
    constructor() {
        this.map = map.oMap;
        this.arrUpPipe = [];
        this.arrDownPipe = [];
        this.arrTimer = [];
    }

    Pipe() {
        let arrUpPipe = this.arrUpPipe;
        let arrDownPipe = this.arrDownPipe;
        // 创建新div
        this.upPipe = document.createElement("div");
        this.downPipe = document.createElement("div");
        // 将管道的类赋值给div
        this.upPipe.className = "uppipe";
        this.downPipe.className = "downpipe";
        // 添加到数值并加类
        arrUpPipe.push(this.upPipe);
        arrDownPipe.push(this.downPipe);
        // 添加到body中
        this.map.appendChild(this.upPipe);
        this.map.appendChild(this.downPipe);
        // 启用管道移动方法
        this.pipeMove();
        // 启用随机数方法
        let random = this.random(1, 10);
        // 启用随机管道高度方法
        this.pipeHeight(random);
        // 启用碰撞检测方法
        this.collision();
    }

    pipeMove() {
        // 获取管道
        let upPipe = this.upPipe;
        let downPipe = this.downPipe;
        // 获取管道数组
        let arrUpPipe = this.arrUpPipe;
        let arrDownPipe = this.arrDownPipe;
        let arrTimer = this.arrTimer;
        // 设置默认绝对定位值
        let pipeX = -52;
        arrTimer.push(setInterval(function () {
            // 平铺值递减
            pipeX += 1;
            // 将平铺值赋给标签
            upPipe.style.right = pipeX + "px";
            downPipe.style.right = pipeX + "px";
            // 删除超出管道
            if (pipeX >= 900) {
                // 删除索引是第一的管道
                arrUpPipe[0].parentNode.removeChild(arrUpPipe[0]);
                arrDownPipe[0].parentNode.removeChild(arrDownPipe[0]);
                // 删除第一个索引,第二个索引就变成了第一个
                arrUpPipe.splice(0, 1);
                arrDownPipe.splice(0, 1);
                // 关闭定时器
                clearInterval(arrTimer[0]);
                arrTimer.splice(0, 1);
            }
            // 加分数
            if (pipeX === 780) {
                fractionValue++;
                document.querySelector("#fraction").innerHTML = fractionValue;
            }
            // 碰撞判断
            // 获取小鸟
            let bird2 = bird.oBird;
            // 获取小鸟的高度和管道高度
            let birdY = bird.oBird.style.top;
            // 获取小鸟飞行触发方法
            birdY = parseInt(birdY);
            let upPipeTop = parseInt(arrUpPipe[0].style.bottom);
            // 获取管道top值
            upPipeTop = 800 - upPipeTop - 315;
            let downPipeTop = parseInt(arrDownPipe[0].style.top);
            downPipeTop = downPipeTop + 315;
            // 靠近管道执行的代码
            if (pipeX <= 780 && pipeX >= 728) {
                // 碰撞后的操作
                if (birdY >= upPipeTop || birdY <= downPipeTop) {
                    for (let i = 0; i < arrTimer.length; i++) {
                        clearInterval(arrTimer[i]);
                    }
                    clearInterval(map.timer);
                    key = 0;
                    setTimeout(function () {
                        bird2.style.animation = "dead 0.4s ease-in-out 0s 1 forwards";
                    }, 800);
                    document.querySelector("#user").style.display = "block";
                }
            }
        }, 10))
    }

    // 生成随机数
    random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        return num;
    }

    // 随机管道高度
    pipeHeight(random) {
        // 获取管道标签
        let upPipe = this.upPipe;
        let downPipe = this.downPipe;
        // 随着随机数生成不同高度管道
        if (random === 1) {
            upPipe.style.bottom = 112 + "px";
            downPipe.style.top = -110 + "px";
        } else if (random === 2) {
            upPipe.style.bottom = -180 + "px";
            downPipe.style.top = 0 + "px";
        }
        else if (random === 3) {
            upPipe.style.bottom = 110 + "px";
            downPipe.style.top = -80 + "px";
        }
        else if (random === 4) {
            upPipe.style.bottom = 102 + "px";
            downPipe.style.top = -60 + "px";
        }
        else if (random === 5) {
            upPipe.style.bottom = 80 + "px";
            downPipe.style.top = -280 + "px";
        }
        else if (random === 6) {
            upPipe.style.bottom = 108 + "px";
            downPipe.style.top = -35 + "px";
        }
        else if (random === 7) {
            upPipe.style.bottom = 67 + "px";
            downPipe.style.top = 0 + "px";
        }
        else if (random === 8) {
            upPipe.style.bottom = 52 + "px";
            downPipe.style.top = 0 + "px";
        }
        else if (random === 9) {
            upPipe.style.bottom = 112 + "px";
            downPipe.style.top = -60 + "px";
        }
        else if (random === 10) {
            upPipe.style.bottom = 82 + "px";
            downPipe.style.top = -30 + "px";
        }
    }

    // 碰撞检测
    collision() {
    }
}

// 创建管道
function newPipe() {
    this.newPipe = new Pipe();
    this.timer = setInterval(function () {
        if (key) {
            newPipe.Pipe();
        }
    }, 2500);
}