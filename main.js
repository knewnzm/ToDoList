

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

