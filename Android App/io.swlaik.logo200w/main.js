"ui";
importClass(android.view.WindowManager);

importClass(android.graphics.Path);
importClass(android.view.View);
importClass(android.graphics.BitmapFactory);
importClass(android.graphics.Bitmap);
importClass("java.util.regex.Pattern");
importClass("java.util.regex.Matcher");

function saveBitmap(bitmap, path) {
    let Bitmap = android.graphics.Bitmap
    let BitmapFactory = android.graphics.BitmapFactory
    let baos = new java.io.ByteArrayOutputStream();
    bitmap.compress(Bitmap.CompressFormat.PNG, 100, baos);
    let isBm = new java.io.ByteArrayInputStream(baos.toByteArray());
    let op = new BitmapFactory.Options()
    op.inPreferredConfig = Bitmap.Config.ARGB_8888
    let tos = new java.io.FileOutputStream(path)
    BitmapFactory.decodeStream(isBm, null, op).compress(Bitmap.CompressFormat.PNG, 100, tos);
}

activity.window.addFlags(android.view.View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION);

ui.layout(
    <vertical bg="file://./res/login_background.jpg" h="*">
        <horizontal h="800px" gravity="center" marginTop="120px" >
            <canvas id="board" w="800px" />
        </horizontal>
        <card id="card_p1" w="*" h="36" marginLeft="10" marginRight="10" marginBottom="5" marginTop="30" cardCornerRadius="13dp" cardElevation="0dp" backgroundTint="#88ffffff">
            <RelativeLayout  marginLeft="10" marginRight="5">
                <text id="text_p1" textColor="black" textSize="16sp" marginTop="6" text="弧度：" layout_alignParentLeft="true"/>
                <text id="progress_value1" w="35" h="30" textColor="black" textSize="16sp" text="3" marginTop="6" layout_toRightOf="@id/text_p1"/>
                <seekbar id="progress1" progress="30" w="*" marginTop="8" layout_toRightOf="@id/progress_value1" />
            </RelativeLayout>
        </card>
        <card id="card_p2" w="*" h="36" marginLeft="10" marginRight="10" marginBottom="5" cardCornerRadius="13dp" cardElevation="0dp" backgroundTint="#88ffffff">
            <RelativeLayout  marginLeft="10" marginRight="5">
                <text id="text_p2" textColor="black" textSize="16sp" marginTop="6" text="字体大小：" layout_alignParentLeft="true"/>
                <text id="progress_value2" w="35" h="30" textColor="black" textSize="16sp" text="300" marginTop="6" layout_toRightOf="@id/text_p2"/>
                <seekbar id="progress2" progress="30" w="*" marginTop="8" layout_toRightOf="@id/progress_value2" />
            </RelativeLayout>
        </card>
        <card id="card_name" w="*" h="36" marginLeft="10" marginRight="10" marginBottom="5" cardCornerRadius="13dp" cardElevation="0dp" backgroundTint="#88ffffff">
            <RelativeLayout  marginLeft="10" marginRight="5">
                <text id="text_name" h="30" marginTop="8" textColor="black" textSize="16sp" text="Logo：" layout_alignParentLeft="true"/>
                <input id="name" w="*" text="mi" textSize="18sp" singleLine="true" background="#00ffffff" layout_toRightOf="@id/text_name" paddingBottom="4" />
            </RelativeLayout>
        </card>
        <horizontal>
            <card id="card_color" w="*" h="36" marginLeft="10" marginBottom="5" cardCornerRadius="13dp" cardElevation="0dp" backgroundTint="#88ffffff" layout_weight="1">
                <RelativeLayout  marginLeft="10" marginRight="5">
                    <text id="text_color" h="30" marginTop="8" textColor="black" textSize="16sp" text="颜色：" layout_alignParentLeft="true"/>
                    <input id="color" w="*" text="#ff6900" textSize="18sp" singleLine="true" background="#00ffffff" layout_toRightOf="@id/text_color" paddingBottom="4"/>
                </RelativeLayout>
            </card>
            <card id="card_tcolor" w="*" h="36" marginLeft="10" marginRight="10" marginBottom="5" cardCornerRadius="13dp" cardElevation="0dp" backgroundTint="#88ffffff" layout_weight="1">
                <RelativeLayout  marginLeft="5" marginRight="5">
                    <text id="text_tcolor" h="30" marginTop="8" textColor="black" textSize="14sp" text="字体颜色 Color：" layout_alignParentLeft="true"/>
                    <input id="tcolor" w="*" text="#ffffff" textSize="18sp" singleLine="true" background="#00ffffff" layout_toRightOf="@id/text_tcolor" paddingBottom="4"/>
                </RelativeLayout>
            </card>
        </horizontal>
        <text text="https://github.com/Aslopow" textSize="12sp" textColor="#9e9e9e" marginLeft="20"/>
        <card id="card_save" w="100" h="30" marginRight="18" cardCornerRadius="10dp" cardElevation="3dp"  bg="#66ffffff" backgroundTint="#ffffff" layout_gravity="right">
            <horizontal id="save" w="*" gravity="center" clickable="true" bg="?selectableItemBackground">
                <text text="保存 Save" textSize="16sp" textColor="#ffffff" />
            </horizontal>
        </card>
    </vertical>
);

/*
ui.statusBarColor(colors.TRANSPARENT);
var SystemUiVisibility = ve => {
    var option = View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | (ve ? View.SYSTEM_UI_FLAG_LAYOUT_STABLE : View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
    activity.getWindow().getDecorView().setSystemUiVisibility(option);
};
SystemUiVisibility(false);
*/

var Typeface = android.graphics.Typeface;
var tf = Typeface.createFromFile(java.io.File(files.path("./res/Babylon-Industrial-2.ttf")));
var uicolor = colors.parseColor("#ff6900");
var uitcolor = colors.parseColor("#ffffff");

var w;
var h;

function xiaomi(n, a, offset) {
    var result = new Path();
    var a = a || 1;
    result.moveTo(0, a);
    for (let x = -1; x <= 1; x += 0.01) {
        y = Math.pow(1 - Math.pow(Math.abs(x), n), 1 / n);
        result.lineTo(x * a + offset, y * a + offset);
    }
    for (let x = 1; x >= -1; x -= 0.01) {
        y = -Math.pow(1 - Math.pow(Math.abs(x), n), 1 / n);
        result.lineTo(x * a + offset, y * a + offset);
    }
    return result;
}

function isColor(str) {
    var p = Pattern.compile("^#[0-9A-Fa-f]{6}$");
    var m = p.matcher(String(str));
    return m.find();
}

function drawCanvas(mcanvas) {
    let mp = new Paint();
    let mpaint_bg = new Paint();
    mpaint_bg.setAntiAlias(true);
    mpaint_bg.setStyle(Paint.Style.FILL);

    mpaint_bg.setColor(uicolor);
    let logo_path = xiaomi(ui.progress1.getProgress() / 10, 400, 400);
    mcanvas.drawPath(logo_path, mpaint_bg);

    mp.setAntiAlias(true);
    mp.setStyle(Paint.Style.FILL);
    mp.setTextAlign(Paint.Align.CENTER);
    mp.setTextSize(ui.progress2.getProgress() * 10); //设置字体大小
    mp.setTypeface(tf); //设置字体
    mp.setColor(uitcolor);
    let fontMetrics = mp.getFontMetrics();
    let distance = (fontMetrics.bottom - fontMetrics.top) / 2 - fontMetrics.bottom;
    let name = ui.name.getText() || "";
    mcanvas.drawText(name, 400, 400 + distance, mp);
}

ui.board.on("draw", function(canvas) {
    w = canvas.getWidth();
    h = canvas.getHeight();
    canvas.drawColor(colors.parseColor("#ffffff"));
    drawCanvas(canvas);
});

ui.progress1.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
    onProgressChanged: function(seekbar, i, b) {
        ui.progress_value1.setText(String(ui.progress1.getProgress() / 10));
    }
}));

ui.progress2.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
    onProgressChanged: function(seekbar, i, b) {
        ui.progress_value2.setText(String(ui.progress2.getProgress() * 10));
    }
}));

ui.color.addTextChangedListener(new android.text.TextWatcher({
    afterTextChanged: function(s) {
        uicolor = isColor(s) ? colors.parseColor(s) : uicolor;
    }
}));

ui.tcolor.addTextChangedListener(new android.text.TextWatcher({
    afterTextChanged: function(s) {
        uitcolor = isColor(s) ? colors.parseColor(s) : uitcolor;
    }
}));

var saveLock = true;

ui.save.on("click", () => {
    if (saveLock) {
        saveLock = false;
        let bm = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
        let canvas2 = new Canvas(bm);
        canvas2.drawColor(colors.parseColor("#00ffffff"));
        drawCanvas(canvas2);
        let name = ui.name.getText() == "" ? "1" : ui.name.getText();
        let path = files.path("/sdcard/" + name + ".png");
        saveBitmap(bm, path);
        media.scanFile(path);
        toast("保存成功！若是撕裂请重新保存！ Save Finish");
        toast(path);
        saveLock = true;
    } else {
        setTimeout(function() {
            saveLock = true;
        }, 1000);
    }
});
