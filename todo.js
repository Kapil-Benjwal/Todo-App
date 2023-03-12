const additem = () => {

    let toDoText = document.getElementById("textarea").value;

    if (toDoText.trim() === '') {
        throughError('texterror', 'Please write Somthing');
    }
    else {
        throughError('texterror', '');
    }

    let errorMessage = document.getElementById('texterror').innerHTML;
    if (errorMessage) {
        setTimeout(() => throughError('texterror', ''), 5000);
    }

    let toDolist = JSON.parse(localStorage.getItem('todolist'));
    if (!Array.isArray(toDolist)) {
        toDolist = [];
    }

    let userIndex = document.getElementById('element-id').value || -1;
    if (toDoText.trim() !== '') {
        if (userIndex === -1) {
            toDolist.push(toDoText);

        }
        else {
            toDolist[userIndex] = toDoText;
        }
        localStorage.setItem('todolist', JSON.stringify(toDolist));
    }



    document.getElementById("textarea").value = '';
    document.getElementById("element-id").value = '';
    document.getElementById("textarea").style.background = '';
    document.getElementById('add').innerHTML = "add";
    document.getElementById('add').style.color = '';

    addNotes();
}


const throughError = (id, errorMessage) => {
    document.getElementById(id).innerHTML = errorMessage;
}


const addNotes = () => {
    let list = '';
    let dataToDo = JSON.parse(localStorage.getItem('todolist'));
    if (!dataToDo) {
        return;
    }
    dataToDo.forEach((element, index) => {
        list += `<tr>
                    <th><h3>${index + 1}</h3></th>
                    <td><textarea name="todo" class="form-control" id="textarea" cols="50" rows="2" readonly>${(element).trim()}</textarea></td>
                    <td><button type="edit" id='edit_button' class="btn btn-secondary" onclick="editData(${index})">edit</button>
                    <button type="button" class="btn btn-secondary" onclick="deleteData(${index})">delete</button></td>
                </tr>`
    });

    document.getElementById('viewTodo').innerHTML = list;
}


const editData = (i) => {
    let dataToDo = JSON.parse(localStorage.getItem('todolist'));
    setInputFieldValue('element-id', i);
    setInputFieldValue("textarea", dataToDo[i]);
    let setFocus = document.getElementById('edit_button').onclick;
    if (setFocus) {
        document.getElementById("textarea").focus();
        document.getElementById("textarea").style.background = "yellow";
    }
    document.getElementById('add').innerHTML = "save";
    document.getElementById('add').style.color = 'blue';

}

const setInputFieldValue = (id, editValue) => {
    document.getElementById(id).value = editValue;
}



const deleteData = (itemIndex) => {
    let dataToDo = JSON.parse(localStorage.getItem('todolist'));
    dataToDo.splice(itemIndex, 1);
    localStorage.setItem('todolist', JSON.stringify(dataToDo));
    document.getElementById("element-id").value = '';
    document.getElementById("textarea").value = '';
    document.getElementById("textarea").style.background = "";
    document.getElementById('add').innerHTML = "add";
    addNotes();
}

addNotes();

