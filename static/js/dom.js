// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        fetch('/get-boards')
            .then((response) => response.json())
            .then((boards) => {
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
    fetch(`/get-board-statuses/${board.id}`)
        .then((response) => response.json())
        .then((statuses) => {
            console.log(statuses);

            let body = createBody(board,statuses);
            section.appendChild(body);
            container.appendChild(section)
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
        let content = document.createElement("div");
        content.setAttribute("class", "board-column-content");
        title.innerText = status.title;
        column.appendChild(title);
        for (let i = 0; i < 4; i++) {
            //Annyiszor ahany kartya van az adott kerdeshez a statussal
            let card = document.createElement("div");
            card.setAttribute("class", "card")
            content.appendChild(card)
        }
        column.appendChild(content);
        columns.appendChild(column)

    }
    return columns


}


function createHeader(board) {
    let span = document.createElement("span");
    span.setAttribute("class", "board-title");
    let toggleButton = createTrashButton();
    let addButton = createAddCardButton();
    let headerDiv = document.createElement("div");
    headerDiv.setAttribute("class", "board-header");
    span.innerHTML = board.title;
    headerDiv.appendChild(span);
    headerDiv.appendChild(toggleButton);
    headerDiv.appendChild(addButton);
    return headerDiv
}


function createTrashButton() {
    let i = document.createElement("i");
    i.setAttribute("class", "fas fa-chevron-down");
    let toggleButton = document.createElement("button");
    toggleButton.setAttribute("class", "board-toggle");
    toggleButton.appendChild(i);
    return toggleButton

}

function createAddCardButton() {
    let addButton = document.createElement("button");
    addButton.setAttribute("class", "board-add");
    addButton.innerText = "Add card";
    return addButton

}