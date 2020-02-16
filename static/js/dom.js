// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
        addNewPublicBoard();
        setSaveButton()
    },
    loadBoards: function () {
        dataHandler.getBoards((boards) => {
                for (let board of boards) {
                    createBoard(board);
                }
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
            let newColumnTitle = prompt('Please enter a new title')
            if (newColumnTitle !== null) {
                title.innerText = newColumnTitle
            }
        });
        let content = document.createElement("div");
        content.setAttribute("class", "board-column-content");
        title.innerText = status.title;
        column.appendChild(title);
        fetch(`/get-cards-by-statuses/${board.id}/${status.status_id}`)
            .then((response) => response.json())
            .then((cards) => {
                for (let card of cards) {
                    let cardForTable = document.createElement("div");
                    cardForTable.setAttribute("class", "card");
                    cardForTable.innerText = card.title;
                    content.appendChild(cardForTable)
                }
            });
        column.appendChild(content);
        columns.appendChild(column);
        columns.setAttribute("id", `${board.id}`)

    }
    return columns


}


function createHeader(board) {
    let span = document.createElement("span");
    span.setAttribute("class", "board-title");

    let toggleButton = createTrashButton(board.id);
    let addButton = createAddCardButton();
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
    return headerDiv
}


function createTrashButton(id) {
    let i = document.createElement("i");
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

function createAddCardButton() {
    let addButton = document.createElement("button");
    addButton.setAttribute("class", "board-add");
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
        console.log(newTitle)
        // let pub = document.getElementById("check-board-public");

        // let object = { "title": newTitle, "public"= }
        dataHandler.newBoard(newTitle, function () {
            // newTable(newTitle)
            // dom.loadBoards()
        })
    })

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