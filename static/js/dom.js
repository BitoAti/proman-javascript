// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
        addNewPublicBoard();
        setSaveButton()
    },
    loadBoards: function () {
        fetch('/get-boards')
            .then((response) => response.json())
            .then((boards) => {
                    for (let board of boards) {
                        createBoard(board);
                    }
                    addNewCard();
                }
            )
    }
};

function createBoard(board) {
    let section = document.createElement("section");
    section.setAttribute("class", "board");
    let container = document.querySelector(".board-container");
    let header = createHeader(board);
    section.appendChild(header);
    container.appendChild(section);

    fetch(`/get-board-statuses/${board.id}`)
        .then((response) => response.json())
        .then((statuses) => {
            let body = createBody(board, statuses);
            section.appendChild(body);
        });
}

function createBody(board, statuses) {
    let columns = document.createElement("div");
    columns.setAttribute("class", "board-columns");
    for (let status of statuses) {
        let column = document.createElement("div");
        column.setAttribute("class", "board-column");
        let title = document.createElement("div");
        title.setAttribute("class", "board-column-title");
        title.addEventListener("click", () => {
            let newColumnTitle = prompt('Please enter a new title');
            if (newColumnTitle !== null) {
                title.innerText = newColumnTitle
            }
        });
        title.innerText = status.title;
        column.appendChild(title);
        fetch(`/get-cards-by-statuses/${board.id}/${status.status_id}`)
            .then((response) => response.json())
            .then((cards) => {
                for (let card of cards) {
                    let cardForTable = document.createElement("div");
                    cardForTable.setAttribute("class", "card");
                    cardForTable.setAttribute('data', `${card.id}`);
                    cardForTable.innerText = card.title;
                    column.appendChild(cardForTable);
                    cardForTable.addEventListener('dblclick', (event) => {
                        dataHandler._api_post('/delete-card', {'id': card.id})
                    });
                    cardForTable.addEventListener('click', () => {
                        cardForTable.innerText = prompt('type new title');
                        let cardDetails = {'id': card.id, 'title': cardForTable.innerText};
                        dataHandler._api_post('/rename-card', cardDetails);
                    })

                }
            });
        columns.appendChild(column);
        columns.setAttribute("id", `${board.id}`)

    }
    return columns


}


function createHeader(board) {
    let span = document.createElement("span");
    span.setAttribute("class", "board-title");
    let toggleButton = createTrashButton(board.id);
    let addButton = createAddCardButton(board.id);
    let delButton = deleteButton(board.id);
    let headerDiv = document.createElement("div");
    headerDiv.setAttribute("class", "board-header");
    span.innerHTML = board.title;
    span.addEventListener("click", (event) => {
        event.preventDefault();
        let reTitle = prompt("type new title");

        span.innerHTML = reTitle;
        let dictTitle = {
            "id": board.id,
            "title": reTitle
        };

        dataHandler.renameBoard(dictTitle, function () {

            }
        );


    });
    headerDiv.appendChild(span);
    headerDiv.appendChild(toggleButton);
    headerDiv.appendChild(addButton);
    headerDiv.appendChild(delButton);
    return headerDiv
}


function createTrashButton(id) {
    let i = document.createElement("span");
    i.setAttribute("class", "fas fa-chevron-down");

    let toggleButton = document.createElement("button");
    toggleButton.setAttribute("class", "board-toggle");
    toggleButton.addEventListener("click", () => {

        let body = document.getElementById(`${id}`);
        body.classList.toggle("board-columns-close")


    });
    toggleButton.appendChild(i);
    return toggleButton
}

function createAddCardButton(id) {
    let addButton = document.createElement("button");
    addButton.setAttribute("class", "card-add");
    addButton.setAttribute("data-id", `${id}`);
    addButton.innerText = "Add card";
    return addButton

}

function addNewPublicBoard() {
    document.getElementById('add-public-board').addEventListener('click', function () {
        const modal = document.querySelector('.modal');
        const closeButton = document.getElementById('closeButton');
        modal.style.display = 'block';
        closeButton.addEventListener('click', function () {
            modal.style.display = 'none';
        });
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }


        })

    });

}

function setSaveButton() {
    let sButton = document.getElementById("save-public-board");

    sButton.addEventListener("click", () => {
        // event.preventDefault();
        let newTitle = document.getElementById("new-board-title").value;
        console.log(newTitle);
        // let pub = document.getElementById("check-board-public");

        // let object = { "title": newTitle, "public"= }
        dataHandler.newBoard(newTitle, function () {
            // newTable(newTitle)
            // dom.loadBoards()
        })
    })

}


function deleteButton(id) {
    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'delete-button');
    deleteButton.textContent = "Delete board";
    deleteButton.addEventListener('click', (event) => {

        dataHandler.deleteBoard(id, dom.loadBoards());

    });
    return deleteButton
}

// function newTable(title) {
//     let container = document.querySelector(".board-container");
//     let section = document.createElement("section");
//     section.setAttribute("class", "board");
//     section.appendChild(createNewHeader(title));
//     container.appendChild(section)
// }
//
// function createNewHeader(title) {
//     let span = document.createElement("span");
//     span.setAttribute("class", "board-title");
//     let toggleButton = createTrashButton(board.id);
//     let addButton = createAddCardButton();
//     let headerDiv = document.createElement("div");
//     headerDiv.setAttribute("class", "board-header");
//     span.innerHTML = title;
//     headerDiv.appendChild(span);
//     headerDiv.appendChild(toggleButton);
//     headerDiv.appendChild(addButton);
//     console.log(headerDiv);
//     return headerDiv
// }


function addNewCard(event) {
    const addCardButtons = document.querySelectorAll('.card-add');
    for (let addCardButton of addCardButtons) {
        addCardButton.addEventListener('click', function () {
            const boardId = addCardButton.dataset.id;
            const div = document.createElement("div");
            div.setAttribute('class', 'card');
            div.innerHTML = "<div class='card-title'>Click to rename!</div>";
            this.parentElement.nextElementSibling.firstElementChild.append(div);
            dataHandler.createNewCard(boardId)
        });
    }

}



