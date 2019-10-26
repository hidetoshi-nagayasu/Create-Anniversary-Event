// Definition
var ANNIVERSARY_YEAR  = 2012;
var ANNIVERSARY_MONTH = 5;
var ANNIVERSARY_DAY   = 21;
var CALENDAR_ID       = 'xxxxxxxxxxxxxxxxxxxx@group.calendar.google.com';


/**
 * 記念日の情報を設定する
 */
function createAnniversaryEvent() {
  
  // 登録するカレンダーを設定
  var calendar = CalendarApp.getCalendarById(CALENDAR_ID);
  
  // 今年を指定
  var year = new Date().getFullYear();

  // 1月〜12月までをループしてイベント情報を設定
  for(var month = 1; month <= 12; month++) {
    var yearNum  = 0
    var monthNum = 0;
    
    // ○年○ヶ月の設定
    if(month < ANNIVERSARY_MONTH) {
      yearNum = year - ANNIVERSARY_YEAR - 1;
      monthNum = month + (12 - ANNIVERSARY_MONTH);
    } else {
      yearNum = year - ANNIVERSARY_YEAR;
      monthNum = month - ANNIVERSARY_MONTH;
    }
    
    var title = yearNum + '年' + monthNum + 'ヶ月記念日';
    var date = new Date(year, month - 1, ANNIVERSARY_DAY);
    
    Logger.log(title);
    Logger.log(date);
    
    // イベント登録実行
    _addToCalendar(calendar, title, date);
  }
}


/**
 * カレンダーにイベント登録を実行する
 *
 * @param calendar 登録するカレンダー
 * @param content  登録イベント情報
 * @param date     登録イベント日時
 */
function _addToCalendar(calendar, title, date) {

  // 終了日時
  var endTime   = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

  // その日のイベント
  var eventsForDay = calendar.getEvents(date, endTime);
  var exsists = false;
  
  // 既存のイベントに存在するか確認する
  for (var l = 0; l < eventsForDay.length; l++) {
    
    // 存在したらフラグを立ててループを抜ける
    if (title === eventsForDay[l].getTitle()) {
      exsists = true;
      break;
    }
  }
  
  // 既存のイベントが存在しなかった場合のみイベントを登録する
  if (!exsists) {
    var event = calendar.createAllDayEvent(title, date);
    
    // 1時間前にリマインダーを設定
    event.addPopupReminder(60);
  }
}  