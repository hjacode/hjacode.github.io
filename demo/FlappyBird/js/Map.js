class Map {
    constructor() {
        // 获取map标签
        this.oMap = document.querySelector("#map")
        // 设置div标签类
        this.oMapLand = document.querySelector("#map .map-land");
        // 调用地图移动方法
        this.mapMove();
    }

    // 地图移动方法
    mapMove() {
        let oMap = this.oMap;
        let oMapLand = this.oMapLand;
        // 地图图片平铺像素值
        let oMapValue = 0;
        // 地图土地图片平铺值
        let oMapLandValue = 0;
        this.timer = setInterval(function () {
            // 平铺值递减
            oMapValue -= 1;
            oMapLandValue -= 1;
            // 将平铺值赋给标签
            oMap.style.backgroundPositionX = oMapValue + "px";
            oMapLand.style.backgroundPositionX = oMapLandValue + "px";
            // 平铺值到最大值返回起来
            if (oMapValue <= -443) {
                oMapValue = 0;
            }
            if (oMapLandValue <= -336) {
                oMapLandValue = 0;
            }
        }, 10)
    }
}
