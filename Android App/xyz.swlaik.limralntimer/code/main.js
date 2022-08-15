var time=dialogs.input("时间 time s");
var 铃声类型=dialogs.singleChoice("选择铃声 Noise",["1st 铃声1","2nd 铃声2","3rd 铃声3"]);
sleep(time*1000);
function 铃声(铃声类型, 是否循环播放, 播放时长){
  var 播放时长 = 播放时长 || 10000
  var 是否循环播放 = 是否循环播放 || false
  if (是否循环播放) {
    播放时长 = 666 * 1000
  }
  var 铃声选择结果 = android.media.RingtoneManager.TYPE_NOTIFICATION
  switch (铃声类型) {
    case 0:
      铃声选择结果 = android.media.RingtoneManager.TYPE_RINGTONE
      break;
    case 1:
      铃声选择结果 = android.media.RingtoneManager.TYPE_ALARM
      break;
    case 2:
      铃声选择结果 = android.media.RingtoneManager.TYPE_ALL
      break;
    default:
      break;
  }
  var mp = new android.media.MediaPlayer();
  mp.setDataSource(context, android.media.RingtoneManager.getDefaultUri(铃声选择结果));
  if (是否循环播放) mp.setLooping(true);
  mp.prepare();
  mp.start();
  threads.start(function () {
    sleep(播放时长)
    if (mp.isPlaying()) {
      mp.stop()
    }
  });
  return mp;
}
铃声(铃声类型);
