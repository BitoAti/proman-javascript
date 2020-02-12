from flask import Flask, render_template, url_for, request, session, redirect
from util import json_response
import data_manager
import hashing

app = Flask(__name__)

app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    # data_manager.alma("Done",3)
    # print(data_manager.alma2(1))
    # print(data_manager.get_cards_for_board(1))

    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    return data_manager.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    return data_manager.get_cards_for_board(board_id)


@app.route("/get-board-statuses/<int:board_id>")
@json_response
def get_board_statuses(board_id: int):
    return data_manager.get_board_statuses(board_id)


@app.route("/get-cards-by-statuses/<int:board_id>/<int:status_id>")
@json_response
def get_cards_by_statuses(board_id: int, status_id: int):
    return data_manager.get_cards_by_statuses(board_id, status_id)


@app.route('/', methods=['GET', 'POST'])
def register_user():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        hashed = hashing.hash_password(password)
        data_manager.get_user_registration_data(username, hashed)
        session['username'] = request.form['username']
        session['id'] = data_manager.get_user_id(username)
        return redirect('/')
    return render_template('index.html')


@app.route('/login', methods=['POST'])
def login_user():
    username = request.form.get('username')
    password = request.form.get('password')
    hashed = data_manager.get_user_login_data(username)
    hashed_password = hashed['password']
    verification = hashing.verify_password(password, hashed_password)
    if verification:
        session['username'] = request.form['username']
        session['id'] = data_manager.get_user_id(username)
    return redirect('/')

@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return redirect('/')

def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():

        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))





if __name__ == '__main__':
    main()
