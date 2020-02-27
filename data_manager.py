import database_common


@database_common.connection_handler
def get_boards(cursor):
    cursor.execute('''
        SELECT * FROM board
        ORDER BY id DESC;
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
def add_new_board(cursor, board_title):
    cursor.execute('''
    INSERT INTO board (title)
    VALUES (%(board_title)s);
    ''',
                   {
                       'board_title': board_title,

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


@database_common.connection_handler
def update_title(cursor, retitle, boardid):
    cursor.execute('''UPDATE board SET title = %(retitle)s
    WHERE id = %(boardid)s    
    
    ''', {
        "retitle": retitle,
        "boardid": boardid
    })


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


@database_common.connection_handler
def delete_board(cursor, board_id):
    cursor.execute('''
        DELETE FROM board
        WHERE board.id = %(board_id)s
    ''', {'board_id': board_id})

@database_common.connection_handler
def add_new_card(cursor, board_id):
    cursor.execute('''
    INSERT INTO card (board_id, title, status_id)
    VALUES (%(board_id)s, 'Click to rename!', 1);
    ''',
                   {
                       'board_id': board_id
                   })

@database_common.connection_handler
def deletecard(cursor, card_to_delete):
    cursor.execute(''' DELETE from card 
    WHERE id = %(card_to_delete)s
    ''', {'card_to_delete': card_to_delete})

@database_common.connection_handler
def rename_cards(cursor, card_id, card_title):
    cursor.execute('''UPDATE card SET title = %(card_title)s
    WHERE id = %(card_id)s
    ''', {'card_id': card_id, 'card_title': card_title})
