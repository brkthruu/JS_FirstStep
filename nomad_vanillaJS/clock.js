/*HTML에서 태그 가져오기*/
const	clockContainer = document.querySelector(".js-clock"),
		clockTitle = clockContainer.querySelector("h1");

/* 시계 구현 */
function getTime(){
	const date = new Date();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}` +
							`:${minutes < 10 ? `0${minutes}` : minutes}` +
							`:${seconds < 10 ? `0${seconds}` : seconds }`;
	
}

/*setInterval method로 1초마다 시간 받아오기*/
function init(){
	getTime();
	setInterval(getTime, 1000);
}

init();