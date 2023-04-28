// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
	var division = document.createElement("div");
	var span = document.createElement("SPAN");
	var txt = document.createTextNode("\u00D7");
	var editSpan = document.createElement("SPAN");
	editSpan.innerHTML = "&#9998";
	division.appendChild(span);
	division.appendChild(editSpan);
	editSpan.className = "edit";
	editSpan.onclick = function () {
		editList(this);
	};
	span.className = "close";
	span.appendChild(txt);
	myNodelist[i].appendChild(division);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
for (i = 0; i < close.length; i++) {
	close[i].onclick = function () {
		var div = this.parentElement.parentElement;
		div.style.display = "none";
		removeFromLocalStorage(div);
	};
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector("ul");
list.addEventListener(
	"click",
	function (ev) {
		console.log("clicked on " + ev.target.tagName);
		if (ev.target.tagName === "DIV") {
			ev.target.parentElement.classList.toggle("checked");
		}
		if (ev.target.tagName === "LI") {
			ev.target.classList.toggle("checked");
		}
	},
	false
);

// Create a new list item when clicking on the "Add" button
function newElement() {
	var li = document.createElement("li");
	var division = document.createElement("div");
	var inputValue = document.getElementById("myInput").value;
	var t = document.createTextNode(inputValue);
	li.appendChild(t);
	if (inputValue === "") {
		alert("You must write something!");
	} else {
		document.getElementById("myUL").appendChild(li);
		addToLocalStorage(inputValue);
	}
	document.getElementById("myInput").value = "";
	var item = document.createElement("div");
	item.classList.add("val");
	item.appendChild(t);
	var span = document.createElement("SPAN");
	var txt = document.createTextNode("\u00D7");
	var editSpan = document.createElement("SPAN");
	editSpan.innerHTML = "&#9998";
	division.appendChild(span);
	division.appendChild(editSpan);
	editSpan.className = "edit";
	editSpan.onclick = function () {
		editList(this);
	};
	span.className = "close";
	span.appendChild(txt);
	li.appendChild(item);
	li.appendChild(division);

	for (i = 0; i < close.length; i++) {
		close[i].onclick = function () {
			var div = this.parentElement.parentElement;
			div.style.display = "none";
			removeFromLocalStorage(div);
		};
	}
}

// Add todo to local storage
function addToLocalStorage(value) {
	var todos = getTodosFromLocalStorage();
	todos.push(value);
	localStorage.setItem("todos", JSON.stringify(todos));
}

// Remove todo from local storage
function removeFromLocalStorage(div) {
	var todos = getTodosFromLocalStorage();
	var todo = div.firstElementChild.innerText;
	var index = todos.indexOf(todo);
	if (index > -1) {
		todos.splice(index, 1);
	}
	localStorage.setItem("todos", JSON.stringify(todos));
}
// Get todos from local storage and display them
function getTodos() {
	var todos = localStorage.getItem("todos");
	if (todos) {
		document.getElementById("myUL").innerHTML = todos;
	}
}

getTodos();

// Add a new todo item to local storage
function addToLocalStorage(todo) {
	var todos = localStorage.getItem("todos");
	if (!todos) {
		todos = "";
	}
	todos += todo;
	localStorage.setItem("todos", todos);
}

// Remove a todo item from local storage
function removeFromLocalStorage(todo) {
	var todos = localStorage.getItem("todos");
	todos = todos.replace(todo, "");
	localStorage.setItem("todos", todos);
}

// Create a new list item when clicking on the "Add" button
function newElement() {
	var li = document.createElement("li");
	var division = document.createElement("div");
	var inputValue = document.getElementById("myInput").value;
	var t = document.createTextNode(inputValue);
	li.appendChild(t);
	if (inputValue === "") {
		alert("You must write something!");
	} else {
		document.getElementById("myUL").appendChild(li);
		addToLocalStorage(
			'<li><div class="val">' +
				inputValue +
				'</div><div><span class="close">\u00D7</span><span class="edit">✎</span></div></li>'
		);
	}
	document.getElementById("myInput").value = "";
	var item = document.createElement("div");
	item.classList.add("val");
	item.appendChild(t);
	var span = document.createElement("SPAN");
	var txt = document.createTextNode("\u00D7");
	var editSpan = document.createElement("SPAN");
	editSpan.innerHTML = "&#9998";
	division.appendChild(span);
	division.appendChild(editSpan);
	editSpan.className = "edit";
	editSpan.onclick = function () {
		editList(this);
	};
	span.className = "close";
	span.appendChild(txt);
	li.appendChild(item);
	li.appendChild(division);

	var close = document.getElementsByClassName("close");
	for (var i = 0; i < close.length; i++) {
		close[i].onclick = function () {
			var div = this.parentElement.parentElement;
			div.style.display = "none";
			removeFromLocalStorage(div.outerHTML);
		};
	}
}

// Edit the list whenever the pencil icon is clicked
function editList(divison) {
	var editButtons = document.getElementsByClassName("editBtn");
	for (let i = 0; i < editButtons.length; i++) {
		editButtons[i].style.display = "none";
	}
	var item = divison.parentElement.parentElement.firstElementChild;
	console.log(item);
	var inputDivision = document.getElementById("myInput");
	inputDivision.value = item.innerHTML;
	var addBtn = document.getElementsByClassName("addBtn");
	addBtn[0].style.display = "none";
	var myDiv = document.getElementById("myDIV");
	var editBtn = document.createElement("span");
	editBtn.innerHTML = "Edit";
	editBtn.classList.add("editBtn");
	myDiv.appendChild(editBtn);
	editBtn.onclick = function () {
		item.innerHTML = inputDivision.value;
		inputDivision.value = "";
		editBtn.remove();
		addBtn[0].style.display = "block";
	};
}
