const noteInput = document.querySelector('.text');
const noteList = document.querySelector('.row1');
const add = document.querySelector('.add');
const clearNote = document.querySelector('.clear');
const deleteAll = document.querySelector('.delete-all');
const filterInput = document.querySelector('.filterInput');
//const deleteNote = document.querySelector('.delete');

loadEventListeners();
freezeBtn();

function loadEventListeners(){
    // Add task
    add.addEventListener('click',addNote);
    clearNote.addEventListener('click',clearInput);
    noteList.addEventListener('click',deleteorEdit);
    deleteAll.addEventListener('click',deleteAllFn);
    filterInput.addEventListener('keyup',filterNotes);
}

function addNote(e){
    if (noteInput.value === ''){
        alert('No note written to add!');
    }
    else{
    const gridWrap = document.createElement('div');
    gridWrap.className = 'col-lg-4 col-md-6 col-sm-12';
    const cardCollection = document.createElement('div');
    cardCollection.className = 'card-collection';
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card mx-auto collection shadow-lg';
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';
    const noteDetails = document.createElement('textarea');
    noteDetails.className = 'text1';
    noteDetails.rows = 8;
    noteDetails.innerText = noteInput.value;
    noteDetails.disabled = true;
    const editBtn = document.createElement('button');
    editBtn.innerText = 'EDIT'
    editBtn.className = 'btn btn-primary btn-sm edit';
    editBtn.type = 'sumbit';
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'DELETE'
    deleteBtn.className = 'btn btn-dark btn-sm delete';
    deleteBtn.type = 'button';
    cardBodyDiv.innerHTML = noteDetails.outerHTML + editBtn.outerHTML + deleteBtn.outerHTML;
    cardDiv.innerHTML = cardBodyDiv.outerHTML;
    cardCollection.innerHTML = cardDiv.outerHTML;
    gridWrap.innerHTML = cardCollection.outerHTML;
    noteList.innerHTML += gridWrap.outerHTML;
    noteInput.value = '';
}
freezeBtn();
}

function clearInput(e){
    if(noteInput.value === '' || noteInput.value.trim().length === 0)
    {
        alert('Nothing to clear!');
    }
    noteInput.value = '';
    freezeBtn();
}

function freezeBtn(){
    if(noteList.innerHTML === '')
    {
        document.querySelector('.delete-all').disabled = true;
    }

    else{
        document.querySelector('.delete-all').disabled = false;
    }
}

function deleteorEdit(e){
    if(e.target.classList.contains('delete'))
    {
        e.target.parentElement.parentElement.parentElement.parentElement.remove();
    }

    if(e.target.classList.contains('edit') && e.target.parentElement.children[0].disabled === true){
        e.target.parentElement.children[0].disabled = false;
        e.target.innerText = 'UPDATE'
        e.target.parentElement.parentElement.setAttribute('style', 'background-color:#f7f1e8 !important');
        e.target.parentElement.children[0].setAttribute('style', 'background-color:#f7f1e8 !important')
        console.log(e.target.parentElement.parentElement);
    }

    else if(e.target.classList.contains('edit') && e.target.parentElement.children[0].disabled === false){
        e.target.parentElement.children[0].disabled = true;
        e.target.innerText = 'EDIT'
        e.target.parentElement.parentElement.setAttribute('style', 'background-color:#e6e6e6 !important');
        e.target.parentElement.children[0].setAttribute('style', 'background-color:#e6e6e6 !important')
    }
    freezeBtn();
}

function deleteAllFn(e){
    noteList.innerHTML = '';
    freezeBtn();
}


function filterNotes(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.text1').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.parentElement.parentElement.parentElement.style.display = 'block';
        }
        else{
            task.parentElement.parentElement.parentElement.style.display = 'none';
        }
    });

}