function power(i){
    powerDialog();
    if (i == 1) {
        sleep(3000);
        swipe(520,1210,520,830,200);
    }
    if (i == 2) {
        sleep(3000);
        swipe(520,1210,520,1620,200);
    }
}
console.show();
console.info("请输入 Please Input：\n1.关机 Shut Down\n重启 Restart");
var i = console.input();
if(i == 1) {
    power(1);
}
if(i == 2){
    power(2);
}
