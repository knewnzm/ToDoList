
const taskInput = document.querySelector("#task__input"); 
const addBtn = document.querySelector("#add__btn");
const tabs = document.querySelectorAll(".list__tabs div");
const tabUnderLine = document.querySelector(".tab__underline");
const input = document.querySelector("#task__input");
let mode = "all";
let filterList = [];
let taskList = [];


//엔터로 메모 등록하기
input.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        addTask();
    }
});


//탭 이동시 언더라인
tabs.forEach((menu) => 
menu.addEventListener("click", (e) => tabIndicator(e))
);

function tabIndicator(e) {
    tabUnderLine.style.left = e.currentTarget.offsetLeft + "px";
    tabUnderLine.style.width = e.currentTarget.offsetWidth + "px";
    tabUnderLine.style.top = 
        e.currentTarget.offsetTop + (e.currentTarget.offsetHeight - 4) + "px";
}



addBtn.addEventListener("click", addTask);


for(let i=0; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
        filter(event)}
        );
}

//메모 등록
function addTask() {
    const task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task);

    //메모 등록시 input칸 비우기
    input.value = '';
    input.focus();

    render();
}

//새로고침
function render() {
    let list = [];
    if(mode == "all") {
        list = taskList;
    } else if(mode == "doing" || mode == "done") {
        list = filterList;
    }


    let resultHTML = "";

    for(let i=0; i<list.length; i++) {
        if(list[i].isComplete == true) {
            resultHTML += `<div class="task">
            <span class="task__done">${list[i].taskContent}</span>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">취소</button>
                <button>삭제</button>
            </div>
        </div>`;  
        } else {
            resultHTML += `<div class="task">
        <span>${list[i].taskContent}</span>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">완료</button>
            <button onclick="deleteTask('${list[i].id}')">삭제</button>
        </div>
    </div>`;    

        }

        
    }

    document.querySelector("#task__list").innerHTML = resultHTML;
}


//"완료"클릭한 메모 true로 변경해주기
function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}


//메모 삭제하기
function deleteTask(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render();
}

//탭 필터링
function filter(event){
    mode = event.target.id;
    filterList = [];
    

    if(mode == "all") {
        render();
    } else if(mode == "doing") {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
        render();
    } else if(mode == "done") {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete == true) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
    console.log(filterList);
}


//랜덤 유니크아이디
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
//Math.random()은 암호학적으로 안전한 random number를 
//생성하지 않기 때문에 보안과 관련된 로직에서는 math.random()을 
//사용하지 않는 것이 좋다.


