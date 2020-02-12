import database_common


@database_common.connection_handler
def get_boards(cursor):
    cursor.execute('''
        SELECT * FROM board;
    ''')
    boards = cursor.fetchall()
    return boards


@database_common.connection_handler
def get_cards_for_board(cursor, id_):
    cursor.execute('''
        SELECT * FROM card
        WHERE board_id = %(id_)s;
    ''', {"id_": id_})
    cards = cursor.fetchall()

    return cards


@database_common.connection_handler
def get_board_statuses(cursor, board_id):
    cursor.execute('''
        SELECT status_id,status.title FROM board_statuses
        INNER JOIN status on status_id = status.id
        WHERE board_id = %(board_id)s;
    
    
    ''', {"board_id": board_id})
    statuses = cursor.fetchall()
    return statuses


@database_common.connection_handler
def get_cards_by_statuses(cursor, board_id, status_id):
    cursor.execute('''
        SELECT * FROM card
        WHERE board_id = %(board_id)s and status_id = %(status_id)s;


    ''', {"board_id": board_id, "status_id": status_id})
    statuses = cursor.fetchall()
    return statuses


# Registration
@database_common.connection_handler
def get_user_registration_data(cursor, username, hashed):
    cursor.execute('''
        INSERT INTO users (username, password)
        VALUES (%(username)s , %(hashed)s);
    ''',
                   {'username': username,
                    'hashed': hashed})

@database_common.connection_handler
def add_new_board(cursor, board_title, private):
    cursor.execute('''
    INSERT INTO board (title, public)
    VALUES (%(board_title)s, %(private)s);
    ''',
                   {
                       'board_title': board_title,
                       'private': private
                   })


# Login
@database_common.connection_handler
def get_user_login_data(cursor, username):
    cursor.execute('''
           SELECT password FROM users
           WHERE username LIKE %(username)s
       ''',
                   {'username': username})
    crypted_password = cursor.fetchone()
    return crypted_password
@database_common.connection_handler
def get_new_board_id(cursor):
    cursor.execute('''
    SELECT max(id) FROM board
    ''')
    board_id = cursor.fetchone()
    return board_id['max']


# get user id to registration
@database_common.connection_handler
def get_user_id(cursor, username):
    cursor.execute('''
        SELECT id FROM users
        WHERE username = %(username)s;

    ''',
                   {'username': username})
    user_id = cursor.fetchone()
    return user_id['id']

@database_common.connection_handler
def add_new_board_status(cursor, board_id):
    cursor.execute('''
    INSERT INTO board_statuses (board_id)
    VALUES (%(board_id)s);
    ''',
                   {
                       'board_id': board_id
                   })
