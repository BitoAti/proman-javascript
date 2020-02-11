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
                    alma(boards);
                }
            )
    }
};
function alma(boards) {
    for (let board of boards) {
        fetch(`/get-cards/${board.id}`)
            .then((response) => response.json())
            .then((cards) => {
                createBoard(board,cards)
            })
    }

}
function createBoard(board,cards){
    console.log(board)
    for(let i=0;i<cards.length;i++){
        console.log(cards[i])
    }



}