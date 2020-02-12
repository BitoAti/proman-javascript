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
    user_id         integer,
    visibility      boolean Not NULL
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


ALTER TABLE board ALTER COLUMN visibility
SET DEFAULT False;

INSERT INTO board
VALUES (1, 'Board 1', TRUE, NULL);
INSERT INTO board
VALUES (2, 'Board 2', TRUE, NULL);
INSERT INTO board
VALUES (3, 'Board 3', TRUE, NULL);

INSERT INTO status
VALUES (0, 'new');
INSERT INTO status
VALUES (1, 'in progress');
INSERT INTO status
VALUES (2, 'testing');
INSERT INTO status
VALUES (3, 'done');

INSERT INTO card
VALUES (1, 1, 'new card 1', 0, 0);
INSERT INTO card
VALUES (2, 1, 'new card 2', 0, 1);
INSERT INTO card
VALUES (3, 1, 'in progress card', 1, 0);
INSERT INTO card
VALUES (4, 1, 'planning', 2, 0);
INSERT INTO card
VALUES (5, 1, 'done card 1', 3, 0);
INSERT INTO card
VALUES (6, 1, 'done card 1', 3, 1);
INSERT INTO card
VALUES (7, 2, 'new card 1', 0, 0);
INSERT INTO card
VALUES (8, 2, 'new card 2', 0, 1);
INSERT INTO card
VALUES (9, 2, 'in progress card', 1, 0);
INSERT INTO card
VALUES (10, 2, 'planning', 2, 0);
INSERT INTO card
VALUES (11, 2, 'done card 1', 3, 0);
INSERT INTO card
VALUES (12, 2, 'done card 1', 3, 1);



INSERT INTO board_statuses
VALUES (1, 0);
INSERT INTO board_statuses
VALUES (1, 1);
INSERT INTO board_statuses
VALUES (1, 2);
INSERT INTO board_statuses
VALUES (1, 3);
INSERT INTO board_statuses
VALUES (2, 0);
INSERT INTO board_statuses
VALUES (2, 1);
INSERT INTO board_statuses
VALUES (2, 2);
INSERT INTO board_statuses
VALUES (2, 3);
INSERT INTO board_statuses
VALUES (3, 0);
INSERT INTO board_statuses
VALUES (3, 1);





