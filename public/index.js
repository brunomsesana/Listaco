if (list){
    for (i=1; i<list; i++){
        newList()
    }
    console.log(list)
    for (i=1; i<item.length; i+=2){
        console.log(document.getElementById('list' + item[i-1]))
        var card = newCard(document.getElementById('list' + item[i-1]).lastElementChild)
        card.innerHTML = item[i]
        if (!document.getElementById(card.id + 'inp')){
            var inp = document.createElement('input')
            inp.id = card.id + 'inp'
            inp.setAttribute('value', inner[i])
            document.getElementById('inps').appendChild(inp)
        } else {
            document.getElementById(card.id + 'inp').setAttribute('value', inner[i])
        }
    }
}
const panel = document.getElementById('panel')
var using
function drag(e){
    e.dataTransfer.setData("text", e.target.id);
}
function drop(e, lb){
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    lb.insertBefore(document.getElementById(data), lb.querySelector('#createcard'))
    lb.getElementsByTagName('input')[0].value ++
    document.getElementById(data).setAttribute("onmouseenter", "deleteBtn('" + lb.id + (lb.getElementsByTagName('input')[0].value) + "')")
    document.getElementById(data).setAttribute("onmouseleave", "deleteBtnoff('" + lb.id + (lb.getElementsByTagName('input')[0].value) + "')")
    document.getElementById(data.replace('div', '')).id = lb.id + (lb.getElementsByTagName('input')[0].value)
    document.getElementById(data.replace('div', 'btn')).id = lb.id + (lb.getElementsByTagName('input')[0].value) + 'btn'
    document.getElementById(data.replace('div', 'inp')).id = lb.id + (lb.getElementsByTagName('input')[0].value) + 'inp'
    document.getElementById(data).id = lb.id + (lb.getElementsByTagName('input')[0].value) + 'div'
}
function allowDrop(e){
    e.preventDefault()
}
function newList(){
    const listbox = document.getElementById('listbox')
    const final = document.getElementById('final')
    var list = document.createElement('div')
    var delbtn = document.createElement('h5')
    var idi = document.createElement('input')
    idi.hidden = true
    idi.type = 'number'
    idi.value = 0
    delbtn.setAttribute('type', 'button')
    delbtn.setAttribute('onclick', 'deleteEl(this)')
    delbtn.className = 'del'
    delbtn.innerHTML = 'X'
    delbtn.style="width: fit-content;"
    delbtn.hidden = true
    list.appendChild(delbtn)
    list.className = "container centralized list"
    list.setAttribute('ondragover', "allowDrop(event)")
    list.setAttribute('ondrop', "drop(event, this)")
    listbox.insertBefore(list, final)
    list.setAttribute('onmouseenter', 'appearbtn(this)')
    list.setAttribute('onmouseleave', 'hidebtn(this)')
    var btn = document.createElement('button')
    list.id = 'list' + (listbox.children.length - 1)
    btn.id = 'createcard'
    btn.className = 'btn item'
    btn.type = 'button'
    btn.setAttribute('onclick', 'newCard(this)')
    btn.innerHTML = 'Adicionar novo cartão +'
    list.appendChild(idi)
    // var btn = document.getElementById('createcard').cloneNode()
    // btn.innerHTML = document.getElementById('createcard').innerHTML
    list.appendChild(btn)
}
function newCard(l){
    var div = document.createElement('div')
    var card = document.createElement('h5')
    var btn = document.createElement('button')
    btn.className = 'btn'
    btn.innerHTML = 'X'
    btn.style = 'float: right; width: fit-content;'
    btn.hidden = true
    btn.setAttribute('onclick', 'deleteEl(this)')
    card.style = 'clear: both;'
    card.className = "container item"
    div.appendChild(card)
    div.appendChild(btn)
    l.parentNode.insertBefore(div, l)
    div.setAttribute('draggable', true)
    div.setAttribute('ondragstart', 'drag(event)')
    card.setAttribute('onclick', 'openPanel(this)')
    l.parentNode.getElementsByTagName('input')[0].value++
    div.setAttribute("onmouseenter", "deleteBtn('" + l.parentNode.id + (l.parentNode.getElementsByTagName('input')[0].value) + "')")
    div.setAttribute("onmouseleave", "deleteBtnoff('" + l.parentNode.id + (l.parentNode.getElementsByTagName('input')[0].value) + "')")
    div.id = l.parentNode.id + (l.parentNode.getElementsByTagName('input')[0].value) + 'div'
    card.id = l.parentNode.id + (l.parentNode.getElementsByTagName('input')[0].value)
    btn.id = l.parentNode.id + (l.parentNode.getElementsByTagName('input')[0].value) + 'btn'
    return card;
}
function deleteBtn(e){
    document.getElementById(e).style = 'display: inline-block; float: left;'
    document.getElementById(e).classList.add('changed')
    document.getElementById(e + 'btn').hidden = false
}
function deleteBtnoff(e){
    document.getElementById(e).style = 'clear: both;'
    document.getElementById(e).classList.remove('changed')
    document.getElementById(e + 'btn').hidden = true
}
function deleteEl(t){
    t.parentNode.remove()
}
function save(){
    var list = ['ignore']
    for(var i=1; i<document.getElementById('listbox').children.length; i++){
        list[i] = ['ignore']
        for(var j=1; j<document.getElementById('list' + i).getElementsByTagName('input')[0].value + 1; j++){
            if(document.getElementById('list' + i + j)){
                list[i][list[i].length] = [document.getElementById('list' + i + j).innerHTML, input(i, j)]
            }
        }
    }
    console.log(list)
    $.post("/save", {list: list})
}
function hidebtn(t){
    t.getElementsByClassName('del')[0].hidden = true
}
function appearbtn(t){
    t.getElementsByClassName('del')[0].hidden = false
}
function openPanel(t){
    panel.hidden = false
    panel.querySelector('#inp').value = t.innerHTML
    using = t.id
    if(document.getElementById(using + 'inp')){
        document.getElementById('innerPanel').innerHTML = document.getElementById(using + 'inp').value
        document.getElementById('innerText').value = document.getElementById('innerText2').value
    } else {
        document.getElementById('innerPanel').innerHTML = '<label for="innerText">Descrição</label><div class="pad10"></div><textarea class="form-control" name="innerText" id="innerText" cols="10" rows="4" onchange="changet(this)"></textarea><input type="text" name="innerText2" id="innerText2" hidden><div class="pad10"></div><button class="btn btn-primary" onclick="createChecklist()">Adicionar Checklist</button><div class="pad10"></div>' 
        document.getElementById('innerText').value = document.getElementById('innerText2').value
    }
}
function closePanel(){
    panel.hidden = true;
}
function savePanel(){
    var btn = document.getElementById(using)
    btn.innerHTML = panel.querySelector('#inp').value
    panel.hidden = true
    if (!document.getElementById(using + 'inp')){
        var inp = document.createElement('input')
        inp.id = using + 'inp'
        inp.setAttribute('value', $('#innerPanel').html())
        document.getElementById('inps').appendChild(inp)
    } else {
        document.getElementById(using + 'inp').value = $('#innerPanel').html()
    }
}
function check(t){
    if (t.checked){
        t.setAttribute('checked', 'true')
    } else {
        t.removeAttribute('checked')
    }
}
function createChecklist(){
    /*<div class="container checklist">
        <input class="form-control" type="text" placeholder="Nome da Checklist">
        <div class="pad10"></div>
        <div class="container checkbox">
            <input type="checkbox" class="form-check-input" id="check1" onchange="check(this)" style="float: right;">
            <h5 contenteditable="true" style="float: left;">Checkbox</h5>
            <div style="clear: both;"></div>
        </div>
        <div class="pad10"></div>
        <button class="btn btn-primary">Adicionar Checkbox</button>
    </div>*/
    var innerPanel = document.getElementById('innerPanel')
    var checklist = document.createElement('div')
    checklist.className = 'container checklist'
    var listName = document.createElement('input')
    listName.className = 'form-control'
    listName.type = 'text'
    listName.placeholder = 'Nome da Checklist'
    listName.setAttribute('onchange', 'change(this)')
    var pad10 = document.createElement('div')
    pad10.className = 'pad10'
    var checkbox = document.createElement('div')
    checkbox.className = 'container checkbox'
    var check = document.createElement('input')
    check.type = 'checkbox'
    check.className = 'form-check-input'
    check.setAttribute('onchange', 'check(this)')
    check.style = 'float: right;'
    var checkName = document.createElement('h5')
    checkName.contentEditable = true
    checkName.style = 'float: left;'
    checkName.innerHTML = 'Escreva o nome do checkbox'
    var clearDiv = document.createElement('div')
    clearDiv.style = 'clear: both;'
    var createCheckbox = document.createElement('button')
    createCheckbox.className = 'btn btn-primary'
    createCheckbox.innerHTML = 'Adicionar Checkbox'
    createCheckbox.setAttribute('onclick', 'createCheckbox(this)')
    checkbox.appendChild(check)
    checkbox.appendChild(checkName)
    checkbox.appendChild(clearDiv)
    checklist.appendChild(listName)
    checklist.appendChild(pad10)
    checklist.appendChild(checkbox)
    checklist.appendChild(pad10.cloneNode())
    checklist.appendChild(createCheckbox)
    innerPanel.appendChild(checklist)
}
function createCheckbox(t){
    var checkbox = document.createElement('div')
    checkbox.className = 'container checkbox'
    var check = document.createElement('input')
    check.type = 'checkbox'
    check.className = 'form-check-input'
    check.setAttribute('onchange', 'check(this)')
    check.style = 'float: right;'
    var checkName = document.createElement('h5')
    checkName.contentEditable = true
    checkName.style = 'float: left;'
    checkName.innerHTML = 'Escreva o nome do checkbox'
    var clearDiv = document.createElement('div')
    clearDiv.style = 'clear: both;'
    var pad10 = document.createElement('div')
    pad10.className = 'pad10'
    checkbox.appendChild(check)
    checkbox.appendChild(checkName)
    checkbox.appendChild(clearDiv)
    t.parentNode.insertBefore(checkbox, t)
    t.parentNode.insertBefore(pad10, t)
}
function input(i, j){
    if(document.getElementById('list' + i + j + 'inp')){
        return $("#list" + i + j + "inp").val()
    } else {
        return '<label for="innerText">Descrição</label><div class="pad10"></div><textarea class="form-control" name="innerText" id="innerText" cols="10" rows="4" onchange="changet(this)"></textarea><input type="text" name="innerText2" id="innerText2" hidden><div class="pad10"></div><button class="btn btn-primary" onclick="createChecklist()">Adicionar Checklist</button><div class="pad10"></div>'
    }
}
function change(t){
    t.setAttribute('value', t.value)
}
function changet(t){
    document.getElementById('innerText2').setAttribute('value', t.value)
}