const toDoForm = document.querySelector(".js-toDoForm"),
		toDoInput = toDoForm.querySelector("input"),
		toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

/* 할일 삭제 */
function deleteToDo(event){
	const btn = event.target;
	const li = btn.parentNode;
	toDoList.removeChild(li);
	const cleanToDos = toDos.filter(function(toDo){
		return toDo.id !== parseInt(li.id);
	});
	toDos = cleanToDos;
	saveToDos(toDos);
}

/* toDos 배열을 가져와 LocalStorage 에 저장
** LS에는 string만 저장할 수 있다.*/
function saveToDos(){
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
/* 할일 생성 */
function generateToDo(text){
	const li = document.createElement("li");
	const delBtn = document.createElement("button");
	delBtn.innerText = "❌";
	delBtn.addEventListener("click", deleteToDo);
	const span = document.createElement("span");
	const newID = toDos.length + 1;
	span.innerText= text;
	li.appendChild(span);
	li.appendChild(delBtn);
	li.id = newID;
	toDoList.appendChild(li); 
	localStorage.setItem(TODOS_LS, text);
	const toDoObj = {
		text: text,
		id: newID
	};
	toDos.push(toDoObj);
	saveToDos();
}

/* submit 버튼을 눌렀을 때 */
function handleSubmit(event){
	event.preventDefault();
	const currentValue = toDoInput.value;
	generateToDo(currentValue);
	toDoInput.value = "";
}

/* 저장된 할일이 있다면 불러오기 */
function loadToDos(){
	const loadedToDos = localStorage.getItem(TODOS_LS);
	if(loadedToDos !== null){
		const parsedToDos = JSON.parse(loadedToDos);
		parsedToDos.forEach(function(toDo){
			generateToDo(toDo.text);
		});
	}
}

function init(){
	loadToDos();
	toDoForm.addEventListener("submit", handleSubmit);
}

init();