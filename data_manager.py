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
def alma(cursor, new, alma):
    cursor.execute('''
        
        INSERT INTO board_statuses (board,status, status_id)
        VALUES (1,%(new)s, %(alma)s);
    ''', {"new": new, "alma":alma})

@database_common.connection_handler
def alma2(cursor, id_):
    cursor.execute('''
        SELECT status FROM board_statuses
        WHERE board = %(id_)s;
    ''', {"id_": id_})
    cards = cursor.fetchall()

    return cards
