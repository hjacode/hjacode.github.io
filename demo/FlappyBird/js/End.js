class End {
    constructor() {
        this.userForm = document.querySelector("#user");
        this.user = document.querySelector("#user>input");
        this.userBth = document.querySelector("#user>button");
        this.userOnclick();
    }

    userOnclick() {
        let userBth = this.userBth;
        let user = this.user;
        userBth.onclick = () => {
            if(user.value == false){
                alert("请输入你的名称");
                return false;
            }else if(user.value.length > 10){
                alert("名称过长");
                user.value = "";
                return false;
            }else{
                this.userForm.action = "./php/ranking.php";
                console.log(6);
            }
        }
    }

}