--
-- PostgreSQL database dump
--

-- Dumped from database version 14.17 (Homebrew)
-- Dumped by pg_dump version 14.17 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: contact_details; Type: TABLE; Schema: public; Owner: tpl522_13
--

CREATE TABLE public.contact_details (
    id integer NOT NULL,
    contact_id integer,
    street character varying(255),
    city character varying(100),
    state character varying(100),
    zip_code character varying(20),
    profession character varying(100)
);


ALTER TABLE public.contact_details OWNER TO tpl522_13;

--
-- Name: contact_details_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl522_13
--

CREATE SEQUENCE public.contact_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contact_details_id_seq OWNER TO tpl522_13;

--
-- Name: contact_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl522_13
--

ALTER SEQUENCE public.contact_details_id_seq OWNED BY public.contact_details.id;


--
-- Name: contacts; Type: TABLE; Schema: public; Owner: tpl522_13
--

CREATE TABLE public.contacts (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(20),
    notes text
);


ALTER TABLE public.contacts OWNER TO tpl522_13;

--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl522_13
--

CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contacts_id_seq OWNER TO tpl522_13;

--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl522_13
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


--
-- Name: contact_details id; Type: DEFAULT; Schema: public; Owner: tpl522_13
--

ALTER TABLE ONLY public.contact_details ALTER COLUMN id SET DEFAULT nextval('public.contact_details_id_seq'::regclass);


--
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: tpl522_13
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- Data for Name: contact_details; Type: TABLE DATA; Schema: public; Owner: tpl522_13
--

COPY public.contact_details (id, contact_id, street, city, state, zip_code, profession) FROM stdin;
1	1	123 Tech Ave	San Francisco	CA	94105	Front-End Developer
2	2	456 Code Ln	San Jose	CA	95112	Back-End Engineer
3	3	789 Dev Blvd	Palo Alto	CA	94301	DevOps Specialist
\.


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: tpl522_13
--

COPY public.contacts (id, name, email, phone, notes) FROM stdin;
1	Emma Taylor	emma.taylor@gmail.com	321-654-9870	Met at DevCon 2023, discussed front-end frameworks like React and Vue.js
2	James Lee	james.lee@gmail.com	654-321-9870	Met at Tech Expo, talked about back-end technologies like Node.js and Express
3	Sophia Martinez	sophia.martinez@gmail.com	987-321-6540	Connected at CI/CD Summit, shared insights on Jenkins and GitLab pipelines
\.


--
-- Name: contact_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl522_13
--

SELECT pg_catalog.setval('public.contact_details_id_seq', 3, true);


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl522_13
--

SELECT pg_catalog.setval('public.contacts_id_seq', 3, true);


--
-- Name: contact_details contact_details_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl522_13
--

ALTER TABLE ONLY public.contact_details
    ADD CONSTRAINT contact_details_pkey PRIMARY KEY (id);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl522_13
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: contact_details contact_details_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl522_13
--

ALTER TABLE ONLY public.contact_details
    ADD CONSTRAINT contact_details_contact_id_fkey FOREIGN KEY (contact_id) REFERENCES public.contacts(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

