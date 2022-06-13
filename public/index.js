function drag(e){
    e.dataTransfer.setData("text", e.target.id);
}
function drop(e, lb){
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    lb.insertBefore(document.getElementById(data), lb.querySelector('#createcard'))
    document.getElementById(data).setAttribute("onmouseenter", "deleteBtn('" + lb.id + (lb.children.length - 2) + "')")
    document.getElementById(data).setAttribute("onmouseleave", "deleteBtnoff('" + lb.id + (lb.children.length - 2) + "')")
    document.getElementById(data.replace('div', '')).id = lb.id + (lb.children.length - 2)
    document.getElementById(data.replace('div', 'btn')).id = lb.id + (lb.children.length - 2) + 'btn'
    document.getElementById(data).id = lb.id + (lb.children.length - 2) + 'div'
}
function allowDrop(e){
    e.preventDefault()
}
function newList(){
    const listbox = document.getElementById('listbox')
    const final = document.getElementById('final')
    var list = document.createElement('div')
    var delbtn = document.createElement('h5')
    delbtn.setAttribute('type', 'button')
    delbtn.setAttribute('onclick', 'deleteEl(this)')
    delbtn.innerHTML = 'X'
    delbtn.style="width: fit-content;"
    list.appendChild(delbtn)
    list.className = "container centralized list"
    list.setAttribute('ondragover', "allowDrop(event)")
    list.setAttribute('ondrop', "drop(event, this)")
    listbox.insertBefore(list, final)
    var btn = document.createElement('button')
    list.id = 'list' + (listbox.children.length - 1)
    btn.id = 'createcard'
    btn.className = 'btn item'
    btn.type = 'button'
    btn.setAttribute('onclick', 'newCard(this)')
    btn.innerHTML = 'Adicionar novo cartão +'
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
    card.className = "container item"
    div.appendChild(card)
    div.appendChild(btn)
    l.parentNode.insertBefore(div, l)
    card.setAttribute('contenteditable', true)
    div.setAttribute('draggable', true)
    div.setAttribute('ondragstart', 'drag(event)')
    div.setAttribute("onmouseenter", "deleteBtn('" + l.parentNode.id + (l.parentNode.children.length - 2) + "')")
    div.setAttribute("onmouseleave", "deleteBtnoff('" + l.parentNode.id + (l.parentNode.children.length - 2) + "')")
    div.id = l.parentNode.id + (l.parentNode.children.length - 2) + 'div'
    card.id = l.parentNode.id + (l.parentNode.children.length - 2)
    btn.id = l.parentNode.id + (l.parentNode.children.length - 2) + 'btn'
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
    console.log(document.getElementById('listbox').children.length - 1)
    list = ['ignore']
    for(var i=1; i<document.getElementById('listbox').children.length; i++){
        list[i] = {}
        for(var j=1; j<document.getElementById('list' + i).children.length - 1; j++){
            list[i][j] = document.getElementById('list' + i + j).innerHTML
        }
    }
    console.log(list)
}