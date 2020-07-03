/*
** get Username from user and save it in LocalStorage 
*/
const	form = document.querySelector(".js-form"),
		input = form.querySelector("input"),
		greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
	SHOWING_CN = "showing";

/* 제출했을 때 */
function handleSubmit(event){
	event.preventDefault();
	const currentValue = input.value;
	paintGreeting(currentValue);
	saveName(currentValue);
}

/* Local Storage에 입력한 값 저장 */
function saveName(text){
	localStorage.setItem(USER_LS, text);
}

function askForName(){
	form.classList.add(SHOWING_CN);
	form.addEventListener("submit", handleSubmit);
}

/* form은 안보이게 가리고, greeting 는 보이게 */
function paintGreeting(text){
	form.classList.remove(SHOWING_CN);
	greeting.innerText =  `Hello ${text}`;
	greeting.classList.add(SHOWING_CN);
}

/* Local Storage 내 값 검사 */
function loadName(){
	const currentUser = localStorage.getItem(USER_LS);
	if(currentUser === null){
		//user doesn't exist
		askForName();
	}else{
		//user exist
		paintGreeting(currentUser);
	}
}
function init(){
	loadName();
}

init();