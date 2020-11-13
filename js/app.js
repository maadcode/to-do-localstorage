// Variables

const $form = document.querySelector('#formulario');
const $itemsList = document.querySelector('#lista-items');

let items = []

// Event Listeners
bindEvents()
function bindEvents() {
    $form.addEventListener('submit', additem);
    document.addEventListener('DOMContentLoaded', () => {
        items = JSON.parse(localStorage.getItem('items')) || []
        createHtml()
    })
}

// Functions

function additem(e) {
    e.preventDefault();
    const item = document.querySelector('#item').value
    if(item === '') {
        showError('Please, complete the field')
        return;
    } 

    const itemObj = {
        id: Date.now(),
        item
    }

    items = [...items, itemObj]

    createHtml()

    $form.reset()
}

function showError(message) {
    const errorMessage = document.createElement('p')
    errorMessage.textContent = message
    errorMessage.classList.add('error')

    const $content = document.querySelector('#contenido')
    $content.appendChild(errorMessage)

    setTimeout(() => {
        errorMessage.remove()
    }, 3000)
}

function createHtml() {
    cleanHtml()

    if(items.length > 0) {
        items.forEach(item => {
            const btnDelete = document.createElement('a');
            btnDelete.classList.add('borrar-item');
            btnDelete.textContent = 'X';

            btnDelete.onclick = () => deleteitem(item.id)

            let itemHtml = document.createElement('li')
            itemHtml.textContent = item.item
            itemHtml.appendChild(btnDelete)

            $itemsList.appendChild(itemHtml)
        })
    }

    updateLocalStorage()
}

function cleanHtml() {
    while($itemsList.firstChild) {
        $itemsList.firstChild.remove()
    }
}

function updateLocalStorage() {
    localStorage.setItem('items', JSON.stringify(items))
}

function deleteitem(id) {
    items = items.filter(item => item.id !== id)
    createHtml()
}