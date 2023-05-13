
const taskInput = document.querySelector("#task__input"); 
const addBtn = document.querySelector("#add__btn");
const taskList = [];

addBtn.addEventListener("click", addTask);

function addTask() {
    const task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task);
    console.log(taskList);
    render();
}

function render() {
    let resultHTML = "";

    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].isComplete == true) {
            resultHTML += `<div class="task">
            <span class="task__done">${taskList[i].taskContent}</span>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">취소</button>
                <button>삭제</button>
            </div>
        </div>`;  
        } else {
            resultHTML += `<div class="task">
        <span>${taskList[i].taskContent}</span>
        <div>
            <button onclick="toggleComplete('${taskList[i].id}')">완료</button>
            <button onclick="deleteTask('${taskList[i].id}')">삭제</button>
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



function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
//Math.random()은 암호학적으로 안전한 random number를 
//생성하지 않기 때문에 보안과 관련된 로직에서는 math.random()을 
//사용하지 않는 것이 좋다.



const add = document.querySelector('.add-btn');
const list = document.querySelector('.list__main');
const inputAdd = document.querySelector('.list__footer');
// const delete = document.querySelector('.del-btn');


add.addEventListener( 'click', () => {

    inputAdd.innerHTML = `
    <input class="input" placeholder=" ex) 공부하기" />
    <button class="enter">enter</button>
    `;

    const enter = document.querySelector('.enter');
    const input = document.querySelector('.input');

    enter.addEventListener('click', () => {
        const text = input.value.trim();
    
        if (text !== '') {
        console.log(text);
        addToList(text);
        input.value = '';
        input.focus();

        return add();
        
    }
    });
});


function addToList(text) {
    const list = document.querySelector('#list');
    const newListItem = document.createElement('li');
    const del = document.createElement('button');

    newListItem.classList.add('list__item');
    newListItem.innerHTML = text;
    list.appendChild(newListItem);

    del.classList.add('del-btn');
    del.innerHTML = '삭제';
    console.log(del);
    del.addEventListener('click', function() {
    list.removeChild(newListItem);
     });
    newListItem.appendChild(del);
}

