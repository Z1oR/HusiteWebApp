// const tg = window.Telegram.WebApp;
// tg.ready();


const mainsection = document.querySelector("#main-section");
const accountsection = document.querySelector("#accounts-section");
const subscriptionssection = document.querySelector("#subscriptions-section");

mainsection.style.display = "flex";
accountsection.style.display = "none";
subscriptionssection.style.display = "none";
// mainsection.style.display = "none";
// accountsection.style.display = "none";
// subscriptionssection.style.display = "flex";


const LeaveAccount = document.querySelector("#LeaveAccount");
const LeaveSub = document.querySelector("#LeaveSub");

const MyBotsBtn = document.querySelector("#MyBotsBtn");
const MySubBtn = document.querySelector("#MySubBtn");

MyBotsBtn.addEventListener("click", () => {
    accountsection.style.display = "flex";
    mainsection.style.display = "none";
    subscriptionssection.style.display = "none";
})

MySubBtn.addEventListener("click", () => {
    accountsection.style.display = "none";
    mainsection.style.display = "none";
    subscriptionssection.style.display = "flex";
})


LeaveAccount.addEventListener("click", () => {
    accountsection.style.display = "none";
    mainsection.style.display = "flex";
    subscriptionssection.style.display = "none";
})

LeaveSub.addEventListener("click", () => {
    accountsection.style.display = "none";
    mainsection.style.display = "flex";
    subscriptionssection.style.display = "none";
})



function getTelegramId() {
    if (window.Telegram.WebApp) {
      const tgid = window.Telegram.WebApp.initDataUnsafe.user.id;
      return tgid;
    } else {
      console.error('Telegram WebApp API не доступен');
      return null;
    }
  }


async function sendPostRequest(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST', // Метод запроса
            headers: {
                'Content-Type': 'application/json' // Тип содержимого
            },
            body: JSON.stringify(data) // Преобразование данных в JSON
        });

        // Проверка, что запрос прошёл успешно
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        // Парсинг ответа от сервера
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Ошибка при отправке POST-запроса:', error);
    }
}
function accountInfo(response){
    console.log(response)
    var username = document.querySelector("#username");
    username.innerHTML = "👋 " + response.name;
    
    var premium = document.querySelector("#premium");
    if (response.sub == "Admin"){
        premium.innerHTML = "Ты админ, красавчик, жизнь удалась!"
    }
    if (response.sub == "user"){
        premium.innerHTML = "Поддержи меня, купи подписку!"
    }
    if (response.sub == "silver" || response.sub == "gold" || response.sub == "platinum"){
        premium.innerHTML = "У тебя есть подписка, спасибо за поддержку ♥"
    }
}
function auth(response){
    console.log(response)
    if (response == true){
        let userId = getTelegramId()
        const url = "http://127.0.0.1:8000/user/account/getInfo/" + userId;
        const data = 0
        sendPostRequest(url, data)
            .then(response => accountInfo(response))
            .catch(error => console.error('Ошибка:', error));   
        
        
        
    }
}



let userId = getTelegramId()
const url = "http://127.0.0.1:8000/user/account/getValid/" + userId;
const data = 0
sendPostRequest(url, data)
    .then(response => auth(response))
    .catch(error => console.error('Ошибка:', error));      
    




