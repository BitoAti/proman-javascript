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
    
    
    ''',    {"board_id": board_id})
    statuses = cursor.fetchall()
    return statuses


@database_common.connection_handler
def get_cards_by_statuses(cursor, board_id, status_id):
    cursor.execute('''
        SELECT * FROM card
        WHERE board_id = %(board_id)s and status_id = %(status_id)s;


    ''', {"board_id": board_id, "status_id":status_id})
    statuses = cursor.fetchall()
    return statuses


# @database_common.connection_handler
# def close_boards(cursor):
#     cursor.execute('''
#
#
#     ''')



@database_common.connection_handler
def update_title(cursor, retitle, boardid):
    cursor.execute('''UPDATE board SET title = %(retitle)s
    WHERE id = %(boardid)s    
    
    ''', {
        "retitle": retitle,
        "boardid": boardid
    })
