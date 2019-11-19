class Bird {
    constructor() {
        // 获取小鸟标签
        this.oBird = document.querySelector("#bird");
        // 设置小鸟标签样式
        this.oBird.style.top = "200px";
        // 获取开始界面小鸟1标签
        this.oPlayBird1 = document.querySelector(".play-bird1");
        console.log(this.oPlayBird1);
    }

    // 设置小鸟样式
    newBird() {
        let bird = this.oBird;
        bird.style.display = "block";
    }

    // 小鸟移动
    birdMove() {
        let bird = this.oBird;
        // 小鸟的y值
        let oBirdY = parseInt(this.oBird.style.top);
        // 小鸟处于上升或者下降的状态 0为下降 1为上升
        let status = 0;
        // 小鸟下落速度
        var flyDown = setInterval(down, 20);
        // 按键盘事件
        document.body.onkeydown = () => {
            if (key) {
                // 判断不同情况的动画
                bird.style.animation = "top 0.4s ease-in-out 0s 1 forwards";
                setTimeout(function () {
                    if (status === 0) {
                        bird.style.animation = "down 0.4s ease-in-out 0s 1 forwards";
                    }
                }, 1000);
                // 设置上升定时器
                var flyTop = setInterval(top, 20);
                // 关闭上升定时器
                setTimeout(function () {
                    clearInterval(flyTop);
                }, 500);
            } else { }
        }

        // 点击鼠标事件
        document.body.onclick = () => {
            if (key) {
                // 判断不同情况的动画
                bird.style.animation = "top 0.4s ease-in-out 0s 1 forwards";
                setTimeout(function () {
                    if (status === 0) {
                        bird.style.animation = "down 0.4s ease-in-out 0s 1 forwards";
                    }
                }, 1000);
                // 设置上升定时器
                var flyTop = setInterval(top, 20);
                // 关闭上升定时器
                setTimeout(function () {
                    clearInterval(flyTop);
                }, 500);
            } else { }
        }

        // 小鸟向上移动
        function top() {
            status = 1;
            oBirdY -= 5;
            bird.style.top = oBirdY + "px";
        }

        // 小鸟向下移动
        function down() {
            status = 0;
            oBirdY += 3;
            bird.style.top = oBirdY + "px";
            if (oBirdY >= 640) {
                oBirdY = 640;
            } else if (oBirdY <= 0) {
                oBirdY = 0;
            }
        }
    }

    // 小鸟扇翅膀动画
    birdGif() {
        let bird = document.querySelector("#bird");
        let oPlayBird1 = this.oPlayBird1.className;
        console.log(oPlayBird1);
        // 获取小鸟1标签
        // 当选中第一只小鸟的事件
        if (oPlayBird1 == "play-bird1 select") {
            this.gifTimer = setInterval(function () {
                setTimeout(function () {
                    bird.src = "./images/bird/bird00.png";
                }, 0);
                setTimeout(function () {
                    bird.src = "./images/bird/bird01.png";
                }, 150);
                setTimeout(function () {
                    bird.src = "./images/bird/bird02.png";
                }, 300);
            }, 450);
        }
        // 当选中第二只小鸟的事件
        else if (oPlayBird1 == "play-bird1") {
            bird.src = "./images/bird/bird10.png";
            this.gifTimer = setInterval(function () {
                setTimeout(function () {
                    bird.src = "./images/bird/bird10.png";
                }, 0);
                setTimeout(function () {
                    bird.src = "./images/bird/bird11.png";
                }, 150);
                setTimeout(function () {
                    bird.src = "./images/bird/bird12.png";
                }, 300);
            }, 450);
        }
    }
}