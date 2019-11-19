// 游戏类
class Game {
    constructor() {
        this.timerMap = null;
        // 启用地图移动方法
        this.mapMove();
        // 启用显示游戏界面方法
        this.gameDisplay();
        // 启用飞船控制方法
        this.shipControl();
        // 启用时间计时器
        this.gameTimeValue = 0;
        this.gameTime();
        // 启用主飞船发射子弹方法
        this.mainShipBullet();
        // 生成敌军飞船
        this.enemyShip();
        // 敌军飞船动画
        this.enemyShipAnimation();
        // 生成行星
        this.planet();
        // 生成友方飞船
        this.friendlyShip();
        // 生成背景星球
        this.backgroundBall();
        // 生成燃油
        this.fuel();
        // 燃油计数器
        this.fuelValue = 15;
        this.fuelTime();
        // 分数系统
        this.fraction = 0;
        // 字体调节
        this.fontSize();
    }
    // 地图移动方法
    mapMove() {
        // 获取需要的元素
        let speed = 0;
        this.timerMap = setInterval(() => {
            if (base.pauseStart) {
                speed -= 1.5;
                if (speed <= -3200) {
                    speed = 3200;
                }
                $("#map").style.backgroundPosition = speed + "px";
            }
        }, 10);
    }
    //显示游戏界面方法
    gameDisplay() {
        $("#game").style.display = "block";
    }
    // 飞船控制方法
    shipControl() {
        // 定义坐标
        let shipX = $("#game-mainShip").style.left || 0;
        let shipY = $("#game-mainShip").style.top || 0;
        // 速度
        let speed = 50;
        document.onkeydown = (even) => {
            // 获取键盘码
            let code = even.keyCode;
            // 按键暂停
            if (code === 80) {
                if (base.pauseStart) {
                    $("#pause").style.background = `url("images/start.png")`;
                    base.pauseStart = false;
                } else {
                    $("#pause").style.background = `url("images/pause.png")`;
                    base.pauseStart = true;
                }
            }
            if (base.pauseStart) {
                // 判断按键
                switch (code) {
                    case 65:
                        shipX -= speed;
                        break;
                    case 87:
                        shipY -= speed;
                        break;
                    case 68:
                        shipX += speed;
                        break;
                    case 83:
                        shipY += speed;
                        break;
                }
                shipX = shipX <= 0 ? 0 : shipX;
                shipY = shipY <= 0 ? 0 : shipY;
                shipX = shipX >= 880 ? 880 : shipX;
                shipY = shipY >= 546.7 ? 546.7 : shipY;
                $("#game-mainShip").style.left = shipX + "px";
                $("#game-mainShip").style.top = shipY + "px";
            }
        }
    }
    // 时间计时器
    gameTime() {
        setInterval(() => {
            if (base.pauseStart) {
                this.gameTimeValue++;
                $("#time-value").innerHTML = this.gameTimeValue + "s";
            }
        }, 1000)
    }
    // 主飞船发射子弹方法
    mainShipBullet() {
        document.onkeyup = (even) => {
            if (base.pauseStart) {
                let code = even.keyCode;
                if (code === 32) {
                    this.bullet($("#game-mainShip"), " bullet-blue", 960);
                    base.musicShoot();
                }
            }
        }
    }
    // 生成子弹
    bullet(ship, color, end) {
        // 飞船的位置
        let shipY = ship.style.top || 0;
        let shipX = ship.style.left || 960;
        // 飞船的宽高
        let shipWidth = parseFloat(getComputedStyle(ship).width);
        let shipHeight = parseFloat(getComputedStyle(ship).height);
        let bullet = document.createElement("div");
        bullet.className = `bullet${color}`;
        $("#map").appendChild(bullet);
        // 设置初始子弹位置
        bullet.style.top = parseFloat(shipY) + shipHeight / 2 + "px";
        bullet.style.left = parseFloat(shipX) + shipWidth / 2 + "px";
        // 子弹刚开始的位置
        let begin = parseFloat(bullet.style.left);
        // 子弹速度
        let speed = end > 0 ? 2 : -2;
        let timer = setInterval(() => {
            if (base.pauseStart) {
                // 子弹速度缓动
                if (speed > 0 && speed < 6) {
                    speed += .1;
                } else if (speed < 0 && speed > -6) {
                    speed -= .1;
                }
                begin += speed;
                bullet.style.left = begin + "px";
                if (bullet.className === "bullet bullet-blue") {
                    // 友方子弹碰撞检测
                    for (let enemy of $$(".enemy")) {
                        this.collision(bullet, enemy, () => {
                            base.musicDestroyed();
                            this.fraction += 5;
                            this.fractionDisplay();
                            bullet.parentNode.removeChild(bullet);
                            clearInterval(timer);
                            enemy.className = "dead";
                        });
                    }
                    // 小行星判断
                    for (let planet of $$(".planet")) {
                        this.collision(bullet, planet, () => {
                            let planetCName = /\bplanetDead\b/;
                            let cName = planet.className;
                            if (planetCName.test(planet.className)) {
                                bullet.parentNode.removeChild(bullet);
                                clearInterval(timer);
                                base.musicDestroyed();
                                this.fraction += 10;
                                this.fractionDisplay();
                                planet.className = "dead";
                            } else {
                                planet.className = `${cName + " planetDead"}`;
                                bullet.parentNode.removeChild(bullet);
                                clearInterval(timer);
                            }
                        });
                    }
                    // 友军碰撞
                    for (let mainShip of $$(".mainShip")) {
                        this.collision(bullet, mainShip, () => {
                            if (bullet.parentNode) {
                                bullet.parentNode.removeChild(bullet);
                            }
                            base.musicDestroyed();
                            mainShip.style.display = "none";
                            this.fraction -= 10;
                            this.fractionDisplay();
                            clearInterval(timer);
                        })
                    }
                } else {
                    // 敌方子弹碰撞主飞船检测
                    this.collision(bullet, $("#game-mainShip"), () => {
                        bullet.parentNode.removeChild(bullet);
                        clearInterval(timer);
                        this.fuelValue -= 15;
                        this.fuelJudge();
                    });
                    // 敌方子弹碰撞友方子弹检测
                    for (let bulletBlue of $$(".bullet-blue")) {
                        this.collision(bullet, bulletBlue, () => {
                            if (bullet.parentNode) {
                                bullet.parentNode.removeChild(bullet);
                            }
                            bulletBlue.style.display = "none";
                            clearInterval(timer);
                        });
                    }
                }
                // 如果当前子弹超出了边界关闭定时器删除当前子弹
                if (parseFloat(bullet.style.left) > 960 || parseFloat(bullet.style.left) < -10) {
                    if (bullet.parentNode) {
                        bullet.parentNode.removeChild(bullet);
                    }
                    clearInterval(timer);
                }
            }
        }, 10)
    }
    // 创建敌方飞行物
    flyLabel(cName, id, speed, maxTop, taget) {
        let oDiv = document.createElement("div");
        let begin = 960;
        oDiv.className = `${cName + id}`;
        $("#map").appendChild(oDiv);
        // 如果是友军飞船的方法
        if (/\bmainShip\b/.test(oDiv.className)) {
            // 创建友军飞船的图片
            let oImg = document.createElement("img");
            oImg.src = "./images/my1.png";
            oImg.className = "mainShip-img";
            oDiv.appendChild(oImg);
            // 创建友军飞船的背景颜色
            let oDivIn = document.createElement("div");
            oDivIn.className = "mainShip-in";
            oDivIn.style.background = `#${base.getRandomIntInclusive(0, 999999)}`;
            oDiv.appendChild(oDivIn);
        }
        // 设置随机top值
        let top = base.getRandomIntInclusive(0, maxTop);
        oDiv.style.top = top + "px";
        // 飞行物移动
        let timer = setInterval(() => {
            if (base.pauseStart) {
                begin -= speed;
                oDiv.style.left = begin + "px";
                // 碰撞检测,判断标签是否包含enemy类名
                let enemyCName = /\benemy\b/;
                if (enemyCName.test(oDiv.className)) {
                    this.collision(oDiv, $("#game-mainShip"), () => {
                        oDiv.className = "dead";
                        this.fuelValue -= 15;
                        base.musicDestroyed();
                    });
                }
                let planetCName = /\bplanet\b/;
                if (planetCName.test(oDiv.className)) {
                    this.collision(oDiv, $("#game-mainShip"), () => {
                        oDiv.className = "dead";
                        this.fuelValue -= 15;
                        base.musicDestroyed();
                    });
                }
                if (begin <= taget) {
                    $("#map").removeChild(oDiv);
                    clearInterval(timer);
                }
                if (oDiv.className === "dead") {
                    $("#map").removeChild(oDiv);
                    clearInterval(timer);
                }
            }
        }, 10)
    }
    // 敌军飞船动画
    enemyShipAnimation() {
        let index = 0;
        setInterval(() => {
            for (let j = 0; j < 3; j++) {
                index += 59.5;
                index = index >= 180 ? 0 : index;
                for (let i = 0; i <= $$(".enemyShip").length - 1; i++) {
                    $$(".enemyShip")[i].style.backgroundPosition = index + "px";
                }
            }
        }, 500);
    }
    // 生成敌军飞船
    enemyShip() {
        // 生成飞船
        setInterval(() => {
            if (base.pauseStart) {
                // 生成飞船的数量
                let quantity = base.getRandomIntInclusive(0, 3);
                for (let i = 0; i <= quantity; i++) {
                    let id = base.getRandomIntInclusive(1, 3);
                    let speed = base.getRandomIntInclusive(1, 3);
                    this.flyLabel("enemy enemyShip enemyShip", id, speed, 545, -60);
                }
            }
        }, 1500);
        // 敌军飞船发射子弹
        setInterval(() => {
            if (base.pauseStart) {
                if ($$(".enemyShip").length > 0) {
                    let quantity = base.getRandomIntInclusive(0, $$(".enemyShip").length - 1);
                    this.bullet($$(".enemyShip")[quantity], " bullet-red", -30)
                }
            }
        }, 200);
    }
    // 生成友军飞船
    friendlyShip() {
        // 生成飞船
        setInterval(() => {
            if (base.pauseStart) {
                // 生成飞船的数量
                let quantity = base.getRandomIntInclusive(0, 1);
                for (let i = 0; i <= quantity; i++) {
                    let id = base.getRandomIntInclusive(1, 3);
                    let speed = base.getRandomIntInclusive(1, 3);
                    this.flyLabel("mainShip ", id, speed, 545, -60);
                }
            }
        }, 8000);
    }
    // 生成行星
    planet() {
        setInterval(() => {
            if (base.pauseStart) {
                // 生成行星的数量
                let quantity = base.getRandomIntInclusive(0, 1);
                for (let i = 0; i <= quantity; i++) {
                    let MinId = base.getRandomIntInclusive(1, 2);
                    this.flyLabel("planet planet", MinId, 1, 520, -90);
                    let MaxId = base.getRandomIntInclusive(3, 4);
                    this.flyLabel("planet planetmax planet", MaxId, 1.5, 480, -120)
                }
            }
        }, 5000);
    }
    // 生成背景星球
    backgroundBall() {
        setInterval(() => {
            if (base.pauseStart) {
                let id = base.getRandomIntInclusive(1, 4);
                this.flyLabel("backgroundBall backgroundBall", id, .9, 200, -400);
            }
        }, 25000);
    }
    // 碰撞
    collision(div1, div2, fn) {
        event = event || window.event;
        // // 第一个盒子四个角的位置
        let t1 = div1.offsetTop;
        let r1 = div1.offsetLeft + div1.offsetWidth;
        let b1 = div1.offsetTop + div1.offsetHeight;
        let l1 = div1.offsetLeft;
        // // 第二个盒子四个角的位置
        let t2 = div2.offsetTop;
        let r2 = div2.offsetLeft + div2.offsetWidth;
        let b2 = div2.offsetTop + div2.offsetHeight;
        let l2 = div2.offsetLeft;
        if (b1 < t2 || l1 > r2 || t1 > b2 || r1 < l2) {// 表示没碰上
        } else {
            fn && fn();
        }
    }
    // 生成燃油
    fuel() {
        setInterval(() => {
            if (base.pauseStart) {
                let oDiv = document.createElement("div");
                oDiv.className = "fuel";
                $("#map").appendChild(oDiv);
                // 设置随机top值
                let tagetTop = base.getRandomIntInclusive(0, 539);
                let top = -60;
                // 设置随机left值
                oDiv.style.left = base.getRandomIntInclusive(100, 800) + "px";
                // 速度
                let speed = .1;
                let timer1 = setInterval(() => {
                    this.collision(oDiv, $("#game-mainShip"), () => {
                        base.easeAnimation(oDiv, { left: 25, top: 25 }, () => {
                            oDiv.style.display = "none";
                            this.fuelValue = this.fuelValue + 15;
                            this.fuelJudge();
                        })
                    })
                }, 10);
                let timer2 = setInterval(() => {
                    if (base.pauseStart) {
                        top += speed;
                        if (speed < 2) {
                            speed += .1;
                        }
                        // 到达目标top值停止下降
                        if (top >= tagetTop) {
                            clearInterval(timer2);
                            top = tagetTop;
                            oDiv.style.top = top + "px";
                            // 在原地的一个上下动画
                            let timer3 = setInterval(() => {
                                top = top > tagetTop + 10 ? top - 11 : top + 11;
                                oDiv.style.top = top + "px";
                            }, 500);
                            // 十秒钟后删除燃油
                            setTimeout(() => {
                                oDiv.parentNode.removeChild(oDiv);
                                clearInterval(timer1);
                                clearInterval(timer3);
                            }, 10000);
                        }
                        oDiv.style.top = top + "px";
                    }
                }, 10);
            }
        }, 3000);
    }
    // 燃油计时器
    fuelTime() {
        setInterval(() => {
            if (base.pauseStart) {
                this.fuelJudge(this.pauseStart);
                $("#fuelValue-text").innerHTML = this.fuelValue;
                $("#fuelValue-in").style.width = this.fuelValue > 0 ? this.fuelValue * 5 + "px" : 0 + "px";
                this.fuelValue--;
            }
        }, 1000);
    }
    // 燃油计时器判断
    fuelJudge() {
        if (this.fuelValue <= 0) {
            this.fuelValue = 0;
            // $("#fuelValue-text").innerHTML = this.fuelValue;
            // $("#fuelValue-in").style.width = this.fuelValue > 0 ? this.fuelValue * 5 + "px" : 0 + "px";
            // base.pauseStart = false;
            // alert("game over");
        } else if (this.fuelValue >= 30) {
            this.fuelValue = 30;
        }
    }
    // 分数显示
    fractionDisplay() {
        this.fraction
        $("#fraction>span").innerHTML = this.fraction;
    }
    // 字体调节
    fontSize() {
        let size = parseFloat(getComputedStyle($("#time-value")).fontSize);
        $("#fontSizeAdd").onclick = () => {
            size++;
            if (size <= 24) {
                $("#time-value").style.fontSize = size + "px";
                $("#fraction>span").style.fontSize = size + "px";
                $("#fontSize>p:first-child").style.fontSize = size + "px";
            } else {
                size = 24;
            }
        }
        $("#fontSizeLess").onclick = () => {
            size--;
            if (size >= 12) {
                $("#time-value").style.fontSize = size + "px";
                $("#fraction>span").style.fontSize = size + "px";
                $("#fontSize>p:first-child").style.fontSize = size + "px";
            } else {
                size = 12;
            }
        }
    }
}