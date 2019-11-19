let $ = (elem) => { return document.querySelector(elem) };
let $$ = (elems) => { return document.querySelectorAll(elems) };

class Base {
    constructor() {
        // 滚动函数
        this.onscroll();
        // 导航条设置功能
        this.setting();
        // 手机端导航条
        this.phoneNav();
    }

    onscroll() {
        window.onscroll = () => {
            // 导航条置顶事件
            this.nav();
            // 返回顶部
            this.totop();
        }
    }

    nav() {
        if (window.pageYOffset >= $(".top-bg").offsetHeight) {
            $(".nav").style.position = "fixed";
            $(".nav").style.top = "0px";
            $(".nav").style.left = "0px";
            $(".nav").style.background = "transparent";
            $(".nav-bg").style.display = "block";
        } else {
            $(".nav").style.position = "";
            $(".nav").style.background = "#fff";
            $(".nav-bg").style.display = "none";
        }
    }

    setting() {
        for (let settingBtn of $$(".setting-btn")) {
            settingBtn.onclick = () => {
                $(".setting").style.animation = "settingOn ease-in-out .5s forwards";
            }
        }

        $(".setting-exit").onclick = () => {
            $(".setting").style.animation = "settingEnd ease-in-out .5s forwards";
        }
    }

    phoneNav() {
        $(".phone-nav-btn").onclick = () => {
            if (/\bicon-menu\b/.test($(".phone-nav-btn").className)) {
                $(".phone-nav").style.animation = "phoneNavOn ease-in-out .5s forwards";
                $(".phone-nav-btn").className = "phone-nav-btn iconfont icon-close";
            } else {
                $(".phone-nav").style.animation = "phoneNavEnd ease-in-out .5s forwards";
                $(".phone-nav-btn").className = "phone-nav-btn iconfont icon-menu";
            }
        }
    }

    totop() {
        if (window.pageYOffset >= document.body.clientHeight / 2) {
            $("#totop").style.display = "block";
        } else {
            $("#totop").style.display = "none";
        }

        $("#totop").onclick = () => {
            let speed = 100;
            let timer = setInterval(function () {
                document.documentElement.scrollTop -= speed;
                if (speed <= 55) { }
                else {
                    speed -= 2;
                }
                if (document.documentElement.scrollTop <= 0) {
                    clearInterval(timer);
                }
            }, 20);
        }
    }
}

let base = new Base;