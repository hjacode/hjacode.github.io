// 开始界面类
class Start {
    constructor() {
        // 启用选择飞船颜色方法
        this.selectShipColor();
        // 启用diy飞船颜色方法
        this.diyShipColor();
        // 启用游戏开始按钮事件
        this.startGame();
        // 启用开始界面右侧盒子事件
        this.rigthBox();
    }
    // 选择飞船颜色方法
    selectShipColor() {
        // 获取需要的元素
        let selectBtn = document.querySelectorAll(".start-mainShip-select>span");
        // 将随机数赋给元素的背景颜色属性值
        selectBtn[0].onclick = function () {
            $$(".mainShip-in")[0].style.background = `#${base.getRandomIntInclusive(0, 999999)}`;
            $$(".mainShip-in")[1].style.background = $$(".mainShip-in")[0].style.background;
        }
        selectBtn[1].onclick = function () {
            $$(".mainShip-in")[0].style.background = `#${base.getRandomIntInclusive(0, 999999)}`;
            $$(".mainShip-in")[1].style.background = $$(".mainShip-in")[0].style.background;
        }
    }
    // diy飞船颜色方法
    diyShipColor() {
        // 打开diy模态框
        $(".diy-btn").onclick = function () {
            $("#diy").style.animation = "diyOn .35s ease-in-out 0s 1 forwards";
        }
        // 关闭diy模态框
        $(".diy-end").onclick = function () {
            $("#diy").style.animation = "diyEnd .35s ease-in-out 0s 1 forwards";
        }
        // 判断用户输入的值
        $("#diy-yes").onclick = function () {
            if ($("#diy-color").value == false) {
                alert("请输入颜色进制码");
            } else if ($("#diy-color").value.length > 6 || $("#diy-color").value.length < 3) {
                alert("颜色进制码过长,最多6位,最少三位");
                $("#diy-color").value = "";
            } else {
                $$(".mainShip-in")[0].style.background = `#${$("#diy-color").value}`;
                $$(".mainShip-in")[1].style.background = $$(".mainShip-in")[0].style.background;
            }
        }
        // 自动变换颜色
        $("#diy-vip").onclick = function () {
            if (this.timerDiy) {
                clearInterval(this.timerDiy);
            }
            this.timerDiy = setInterval(function () {
                $(".mainShip-in").style.background = `#${base.getRandomIntInclusive(0, 999999)}`;
            }, 200)
        }
    }
    // 开始游戏开始按钮事件
    startGame() {
        $("#start-btn").onclick = function () {
            $("#start-white").style.display = "block";
            // 删除开始界面
            setTimeout(function () {
                $("#start").parentNode.removeChild($("#start"));
            }, 1000);

            setTimeout(function () {
                // 跳转到游戏类
                let game = new Game();
            }, 1200);

            // 删除白屏盒子
            setTimeout(function () {
                $("#start-white").parentNode.removeChild($("#start-white"));
            }, 2000);
        }
    }
    // 开始界面右侧盒子事件
    rigthBox() {
        $("#help-btn").onclick = () => {
            if ($(".rightBox-help").style.animationName === "rightBoxHelpOn") {
                $(".rightBox-help").style.animationName = "rightBoxHelpEnd";
            } else {
                $(".rightBox-help").style.animationName = "rightBoxHelpOn";
            }
            if ($(".rightBox-ranking").style.animationName === "rightBoxRankingOn") {
                $(".rightBox-ranking").style.animationName = "rightBoxRankingEnd";
            }
        }
        $("#ranking-btn").onclick = () => {
            if ($(".rightBox-ranking").style.animationName === "rightBoxRankingOn") {
                $(".rightBox-ranking").style.animationName = "rightBoxRankingEnd";
            } else {
                $(".rightBox-ranking").style.animationName = "rightBoxRankingOn";
            }
            if ($(".rightBox-help").style.animationName === "rightBoxHelpOn") {
                $(".rightBox-help").style.animationName = "rightBoxHelpEnd";
            }
        }
    }
}