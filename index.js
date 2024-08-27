const tg = window.Telegram.WebApp;
tg.ready();

const user = tg.initDataUnsafe.user;
let TelegramID = `${user.id}`;



var buttonSubstriction = document.querySelector("#buttonSubstriction");
var buttonAccount = document.querySelector("#buttonAccount");
var buttonBot = document.querySelector("#buttonBot");

