ALTER TABLE IF EXISTS ONLY public.board
    DROP CONSTRAINT IF EXISTS pk_board_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.card
    DROP CONSTRAINT IF EXISTS pk_card_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.status
    DROP CONSTRAINT IF EXISTS pk_status_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.users
    DROP CONSTRAINT IF EXISTS pk_user_id CASCADE;


ALTER TABLE IF EXISTS ONLY public.board
    DROP CONSTRAINT IF EXISTS fk_user_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.card
    DROP CONSTRAINT IF EXISTS fk_board_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.card
    DROP CONSTRAINT IF EXISTS pk_status_id CASCADE;


ALTER TABLE IF EXISTS ONLY public.board_statuses
    DROP CONSTRAINT IF EXISTS fk_board_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.board_statuses
    DROP CONSTRAINT IF EXISTS fk_status_id CASCADE;

DROP TABLE IF EXISTS public.board;
DROP SEQUENCE IF EXISTS public.board_id_seq;
CREATE TABLE board
(
    id              serial NOT NULL,
    title           text,
    public          boolean NOT NULL,
    user_id         integer
);

DROP TABLE IF EXISTS public.card;
DROP SEQUENCE IF EXISTS public.card_id_seq;
CREATE TABLE card
(
    id                serial NOT NULL,
    board_id          integer,
    title             text,
    status_id         integer,
    card_order        integer
);

DROP TABLE IF EXISTS public.board_statuses;
CREATE TABLE board_statuses
(
    board_id          integer,
    status_id         integer
);

DROP TABLE IF EXISTS public.status;
DROP SEQUENCE IF EXISTS public.status_id_seq;
CREATE TABLE status
(
    id                serial NOT NULL,
    title             text
);

DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.users_id_seq;
CREATE TABLE users
(
    id                serial NOT NULL,
    username          text,
    password          char(60)
);

ALTER TABLE ONLY board
    ADD CONSTRAINT pk_board_id PRIMARY KEY (id);
ALTER TABLE ONLY card
    ADD CONSTRAINT pk_card_id PRIMARY KEY (id);
ALTER TABLE ONLY status
    ADD CONSTRAINT pk_status_id PRIMARY KEY (id);
ALTER TABLE ONLY users
    ADD CONSTRAINT pk_user_id PRIMARY KEY (id);

ALTER TABLE ONLY board
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
ALTER TABLE ONLY card
    ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES board (id) ON DELETE CASCADE;
ALTER TABLE ONLY card
    ADD CONSTRAINT fk_status_id FOREIGN KEY (status_id) REFERENCES status (id) ON DELETE CASCADE;
ALTER TABLE ONLY board_statuses
    ADD CONSTRAINT fk_status_id FOREIGN KEY (status_id) REFERENCES status (id) ON DELETE CASCADE;
ALTER TABLE ONLY board_statuses
    ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES board (id) ON DELETE CASCADE;

ALTER TABLE board ALTER COLUMN public
SET DEFAULT TRUE;

ALTER TABLE board_statuses ALTER COLUMN status_id
SET DEFAULT 0;

INSERT INTO board (title, public)
VALUES ('Board 1', TRUE);
INSERT INTO board (title, public)
VALUES ('Board 2', TRUE);

INSERT INTO status
VALUES (0, 'choose name');
INSERT INTO status
VALUES (1, 'new');
INSERT INTO status
VALUES (2, 'in progress');
INSERT INTO status
VALUES (3, 'testing');
INSERT INTO status
VALUES (4, 'done');

INSERT INTO board_statuses
VALUES (1, 1);
INSERT INTO board_statuses
VALUES (1, 2);
INSERT INTO board_statuses
VALUES (1, 3);
INSERT INTO board_statuses
VALUES (1, 4);

INSERT INTO board_statuses
VALUES (2, 1);
INSERT INTO board_statuses
VALUES (2, 2);
INSERT INTO board_statuses
VALUES (2, 3);
INSERT INTO board_statuses
VALUES (2, 4);

INSERT INTO card (board_id, title, status_id, card_order)
VALUES (1, 'new card 1', 1, 0);
INSERT INTO card (board_id, title, status_id, card_order)
VALUES (1, 'new card 2', 1, 1);
INSERT INTO card (board_id, title, status_id, card_order)
VALUES (1, 'in progress card', 2, 0);
INSERT INTO card (board_id, title, status_id, card_order)
VALUES (1, 'planning', 3, 0);
INSERT INTO card (board_id, title, status_id, card_order)
VALUES (1, 'done card 1', 4, 0);
INSERT INTO card (board_id, title, status_id, card_order)
VALUES (1, 'done card 1', 4, 1);
INSERT INTO card (board_id, title, status_id, card_order)
VALUES (2, 'new card 1', 1, 0);
INSERT INTO card (board_id, title, status_id, card_order)
VALUES (2, 'new card 2', 1, 1);
INSERT INTO card (board_id, title, status_id, card_order)
VALUES (2, 'in progress card', 2, 0);
INSERT INTO card (board_id, title, status_id, card_order)
VALUES (2, 'planning', 3, 0);
INSERT INTO card (board_id, title, status_id, card_order)
VALUES (2, 'done card 1', 4, 0);
INSERT INTO card (board_id, title, status_id, card_order)
VALUES (2, 'done card 1', 4, 1);






