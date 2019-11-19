class Play {
    constructor() {
        // 整个开始界面
        this.oPlay = document.querySelector("#play")
        // 获取小鸟1标签
        this.oPlayBird1 = document.querySelector("#play .play-bird1");
        // 获取小鸟2标签
        this.oPlayBird2 = document.querySelector("#play .play-bird2");
        // 获取开始按钮
        this.oPlayGame = document.querySelector("#play .playgame");
        // 判断用户选择哪个小鸟
        this.ranKing();
        // 启用小鸟动态方法
        this.gif();
        // 启动关闭游戏开始界面方法
        this.playGame();
        // 启用排行榜方法
        this.ranKing();
        // 启用选择小鸟方法
        this.select();
    }

    // 开始界面小鸟动态效果
    gif() {
        let oPlayBird1 = this.oPlayBird1;
        let oPlayBird2 = this.oPlayBird2;
        let src = `./images/bird/bird`;
        this.gifTimer = setInterval(function () {
            setTimeout(function () {
                oPlayBird1.src = src + "01.png";
                oPlayBird2.src = src + "11.png";
            }, 0);
            setTimeout(function () {
                oPlayBird1.src = src + "02.png";
                oPlayBird2.src = src + "12.png";
            }, 150);
            setTimeout(function () {
                oPlayBird1.src = src + "00.png";
                oPlayBird2.src = src + "10.png";
            }, 300);
        }, 450);
    }

    // 点击开始游戏关闭整个开始界面
    playGame(bird) {
        let oPlay = this.oPlay;
        let gifTimer = this.gifTimer;
        // 删除整个开始界面并且开始其他定时器
        this.oPlayGame.onclick = function () {
            oPlay.parentNode.removeChild(oPlay);
            // 删除开始界面小鸟定时器
            clearInterval(gifTimer);
            // 显示游戏分数
            document.querySelector("#fraction").style.display = "block";
            // 将游戏中小鸟显示
            bird.newBird();
            // 启用小鸟移动方法
            bird.birdMove();
            // 开始后小鸟动画事件
            bird.birdGif();
            // 创建管道
            newPipe();
        }
    }

    ranKing() {
        let ranKingBthOn = document.querySelector("#play .rankingbth");
        let ranKingBthOff = document.querySelector("#play .ranking-title>span");
        let ranKing = document.querySelector("#play .ranking");
        ranKingBthOn.onclick = function () {
            ranKing.style.display = "block";
        }
        ranKingBthOff.onclick = function () {
            ranKing.style.display = "none";
        }
    }

    // 选择小鸟

    select() {
        let oPlayBird1 = this.oPlayBird1;
        let oPlayBird2 = this.oPlayBird2;
        let selectBird1 = document.querySelector("#play .select-bird1");
        let selectBird2 = document.querySelector("#play .select-bird2");
        oPlayBird1.onclick = function () {
            selectBird1.style.display = "block";
            selectBird2.style.display = "none";
            oPlayBird2.className = "play-bird2";
            oPlayBird1.className = "play-bird1 select";
        }
        oPlayBird2.onclick = function () {
            selectBird2.style.display = "block";
            selectBird1.style.display = "none";
            oPlayBird1.className = "play-bird1"
            oPlayBird2.className = "play-bird2 select";
        }
    }
}