--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: event_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl619_2
--

CREATE SEQUENCE public.event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.event_id_seq OWNER TO tpl619_2;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: events; Type: TABLE; Schema: public; Owner: tpl619_2
--

CREATE TABLE public.events (
    event_id integer DEFAULT nextval('public.event_id_seq'::regclass) NOT NULL,
    event_date text,
    event_name text,
    event_category text,
    event_location text
);


ALTER TABLE public.events OWNER TO tpl619_2;

--
-- Name: user_events; Type: TABLE; Schema: public; Owner: tpl619_2
--

CREATE TABLE public.user_events (
    user_id integer,
    event_id integer
);


ALTER TABLE public.user_events OWNER TO tpl619_2;

--
-- Name: users; Type: TABLE; Schema: public; Owner: tpl619_2
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name text
);


ALTER TABLE public.users OWNER TO tpl619_2;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl619_2
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO tpl619_2;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl619_2
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: tpl619_2
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: tpl619_2
--

COPY public.events (event_id, event_date, event_name, event_category, event_location) FROM stdin;
1	2020-02-29	Leap Day Picnic	Food and Drink	Dolores Park
2	2020-03-14	Pi Day Party	Food and Drink	SF
3	2020-06-27	Corgi Con	Sports	Ocean Beach
8	2020-03-14	Dance Gavin Dance	Music	Marquee Theatre
9	2020-07-11	Drag Diva Brunch: Beyonce	Arts & Theatre	Punch Line Comedy Club - Sacramento
\.


--
-- Data for Name: user_events; Type: TABLE DATA; Schema: public; Owner: tpl619_2
--

COPY public.user_events (user_id, event_id) FROM stdin;
17	1
17	2
17	3
23	2
23	9
23	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tpl619_2
--

COPY public.users (user_id, user_name) FROM stdin;
17	Lisa
23	Kim
27	Amy
28	Zhag
29	Tahshara
\.


--
-- Name: event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl619_2
--

SELECT pg_catalog.setval('public.event_id_seq', 13, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl619_2
--

SELECT pg_catalog.setval('public.users_user_id_seq', 48, true);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl619_2
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (event_id);


--
-- Name: user_events user_events_user_id_event_id_key; Type: CONSTRAINT; Schema: public; Owner: tpl619_2
--

ALTER TABLE ONLY public.user_events
    ADD CONSTRAINT user_events_user_id_event_id_key UNIQUE (user_id, event_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl619_2
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: user_events user_events_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl619_2
--

ALTER TABLE ONLY public.user_events
    ADD CONSTRAINT user_events_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(event_id) ON DELETE CASCADE;


--
-- Name: user_events user_events_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl619_2
--

ALTER TABLE ONLY public.user_events
    ADD CONSTRAINT user_events_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

