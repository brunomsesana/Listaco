function drag(e){
    e.dataTransfer.setData("text", e.target.id);
}
function drop(e){
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data))
}
function allowDrop(e){
    e.preventDefault()
}
function newList(){
    const listbox = document.getElementById('listbox')
    const final = document.getElementById('final')
    var list = document.createElement('div')
    list.className = "container centralized list"
    list.setAttribute('ondragover', "allowDrop(event)")
    list.setAttribute('ondrop', "drop(event)")
    listbox.insertBefore(list, final)
}
function newCard(l){
    var card = document.createElement('h5')
    card.className = "item"
    l.parentNode.insertBefore(card, l)
}