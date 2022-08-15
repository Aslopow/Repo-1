var url = "https://avatars.githubusercontent.com/u/111162413?v=4";
var res = http.get(url);
if (res.statusCode != 200) {
    toast("请求失败 Error-0");
}
files.writeBytes("/sdcard/1.png", res.body.bytes());
toast("下载成功 Finish");
app.viewFile("/sdcard/1.png");
