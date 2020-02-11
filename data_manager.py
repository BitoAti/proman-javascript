import database_common


@database_common.connection_handler
def get_boards(cursor):
    cursor.execute('''
        SELECT * FROM board;
    ''')
    boards = cursor.fetchall()
    return boards


@database_common.connection_handler
def get_cards_for_board(cursor):
    cursor.execute('''
        SELECT * FROM card;
    ''')
    cards = cursor.fetchall()
    return cards
