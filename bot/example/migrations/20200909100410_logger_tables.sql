CREATE TABLE public.message_content (
    author_id bigint NOT NULL,
    message_id bigint NOT NULL,
    server_id bigint NOT NULL,
    at_time bigint NOT NULL,
    content text NOT NULL
);
ALTER TABLE ONLY public.message_content
    ADD CONSTRAINT message_content_pk PRIMARY KEY (message_id,server_id);

CREATE TABLE public.pinged_users (
    user_id bigint NOT NULL,
    message_id bigint NOT NULL,
    server_id bigint NOT NULL
);
ALTER TABLE ONLY public.pinged_users
    ADD CONSTRAINT pinged_users_pk PRIMARY KEY (user_id,message_id,server_id);

ALTER TABLE ONLY public.pinged_users
    ADD CONSTRAINT pinged_users_fk FOREIGN KEY (message_id, server_id) REFERENCES public.message_content(message_id,server_id) ON DELETE CASCADE;


CREATE TABLE public.pinged_roles (
    role_id bigint NOT NULL,
    message_id bigint NOT NULL,
    server_id bigint NOT NULL
);

ALTER TABLE ONLY public.pinged_roles
    ADD CONSTRAINT pinged_roles_pk PRIMARY KEY (role_id,message_id,server_id);

ALTER TABLE ONLY public.pinged_roles
    ADD CONSTRAINT pinged_roles_fk FOREIGN KEY (message_id, server_id) REFERENCES public.message_content(message_id,server_id) ON DELETE CASCADE;


CREATE TABLE public.strikes (
    server_id bigint NOT NULL,
    user_id bigint NOT NULL,
    at_time bigint NOT NULL
);

ALTER TABLE ONLY public.strikes
    ADD CONSTRAINT strikes_pk PRIMARY KEY (server_id,user_id);


CREATE INDEX message_content_idx ON public.message_content (at_time);
CREATE INDEX strikes_idx ON public.message_content (at_time);