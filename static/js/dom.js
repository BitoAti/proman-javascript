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
                    getCards(boards);
                }
            )
    }
};

function getCards(boards) {
    for (let board of boards) {
        fetch(`/get-cards/${board.id}`)
            .then((response) => response.json())
            .then((cards) => {
                createBoard(board, cards)
            });
    }


}

function createBoard(board, cards) {
    let container = document.querySelector(".board-container");
    let section = document.createElement("section");
    section.setAttribute("class", "board");
    container.appendChild(section);
    section.innerHTML=header(board.title)



}

const header = function (title) {
    return `
    <div class="board-header"><span class="board-title">${title}</span>
                <button class="board-add">Add Card</button>
                <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
            </div> 
    `


}
