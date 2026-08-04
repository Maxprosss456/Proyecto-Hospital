-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.posiciones (
  id integer NOT NULL,
  posicion character varying NOT NULL,
  CONSTRAINT posiciones_pkey PRIMARY KEY (id)
);
CREATE TABLE public.titulos (
  id_titulos integer NOT NULL,
  titulo character varying NOT NULL,
  CONSTRAINT titulos_pkey PRIMARY KEY (id_titulos)
);
CREATE TABLE public.especialidades (
  id_especialidades integer NOT NULL,
  especialidades character varying,
  CONSTRAINT especialidades_pkey PRIMARY KEY (id_especialidades)
);
CREATE TABLE public.hospitales (
  id integer NOT NULL,
  nombre character varying NOT NULL,
  logo character varying NOT NULL DEFAULT '/hospital_logo.ico'::character varying,
  telefono character varying NOT NULL,
  email character varying NOT NULL,
  codpostal integer NOT NULL,
  CONSTRAINT hospitales_pkey PRIMARY KEY (id)
);
CREATE TABLE public.usuarios (
  id integer NOT NULL DEFAULT nextval('usuarios_id_seq'::regclass),
  usuario character varying NOT NULL UNIQUE,
  clave character varying NOT NULL,
  nombre character varying NOT NULL,
  posicion integer NOT NULL,
  id_hospital integer,
  dni integer NOT NULL,
  apellido character varying NOT NULL,
  antiguedad integer NOT NULL,
  telefono character varying NOT NULL,
  email character varying NOT NULL,
  direccion character varying NOT NULL,
  CONSTRAINT usuarios_pkey PRIMARY KEY (id),
  CONSTRAINT fk_posicion FOREIGN KEY (posicion) REFERENCES public.posiciones(id),
  CONSTRAINT fk_hospital FOREIGN KEY (id_hospital) REFERENCES public.hospitales(id)
);
CREATE TABLE public.sanciones (
  id integer NOT NULL,
  id_sancionado character varying NOT NULL,
  sancion character varying NOT NULL,
  CONSTRAINT sanciones_pkey PRIMARY KEY (id),
  CONSTRAINT fk_sancionado FOREIGN KEY (id_sancionado) REFERENCES public.usuarios(usuario)
);
CREATE TABLE public.informes (
  id integer NOT NULL,
  fecha timestamp without time zone NOT NULL,
  id_hospital character varying NOT NULL,
  id_remitente integer NOT NULL,
  informe character varying NOT NULL,
  CONSTRAINT informes_pkey PRIMARY KEY (id),
  CONSTRAINT fk_remitente FOREIGN KEY (id_remitente) REFERENCES public.usuarios(id)
);
CREATE TABLE public.titulo_usuario (
  id_titulo integer NOT NULL,
  id_usuario integer NOT NULL,
  CONSTRAINT titulo_usuario_pkey PRIMARY KEY (id_titulo, id_usuario),
  CONSTRAINT fk_titulo FOREIGN KEY (id_titulo) REFERENCES public.titulos(id_titulos),
  CONSTRAINT titulo_usuario_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id)
);
CREATE TABLE public.especialidad_hospital (
  id_especialidad integer NOT NULL,
  id_hospital integer NOT NULL,
  CONSTRAINT especialidad_hospital_pkey PRIMARY KEY (id_especialidad, id_hospital),
  CONSTRAINT fk_hospital_esp FOREIGN KEY (id_hospital) REFERENCES public.hospitales(id),
  CONSTRAINT fk_especialidad FOREIGN KEY (id_especialidad) REFERENCES public.especialidades(id_especialidades)
);
CREATE TABLE public.situaciones_urgentes (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  fecha timestamp with time zone NOT NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
  situación character varying NOT NULL,
  id_remitente integer NOT NULL,
  id_hospital integer NOT NULL,
  CONSTRAINT situaciones_urgentes_pkey PRIMARY KEY (id),
  CONSTRAINT situaciones_urgentes_id_remitente_fkey FOREIGN KEY (id_remitente) REFERENCES public.usuarios(id),
  CONSTRAINT situaciones_urgentes_id_hospital_fkey FOREIGN KEY (id_hospital) REFERENCES public.hospitales(id)
);