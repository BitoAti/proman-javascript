from flask import Flask, render_template, url_for, request
from util import json_response
import data_manager

import data_handler

app = Flask(__name__)


@app.route("/", methods=['GET', 'POST'])
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    if request.method == 'POST':
        number_of_columns = 2
        board_title = request.form.get('board-title')
        public = request.form.get('public')
        if public is None:
            public = False
        else:
            public = True
        data_manager.add_new_board(board_title, public)
        new_board_id = data_manager.get_new_board_id()
        for _ in range(number_of_columns):
            data_manager.add_new_board_status(new_board_id)

    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_manager.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """

    return data_manager.get_cards_for_board(board_id)


@app.route("/get-board-statuses/<int:board_id>")
@json_response
def get_board_statuses(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_manager.get_board_statuses(board_id)


@app.route("/get-cards-by-statuses/<int:board_id>/<int:status_id>")
@json_response
def get_cards_by_statuses(board_id: int, status_id: int):
    barack = data_manager.get_cards_by_statuses(board_id, status_id)
    return barack


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
