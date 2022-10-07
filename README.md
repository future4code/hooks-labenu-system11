## LabenuSystem:

Você estuda na Labenu_ há tanto tempo que já parecem anos, não é? Então, hoje, vamos pedir para criar um sistema que represente o básico da nossa organização. 

Ele deve possuir, ao menos, as 3 entidades importantes:

1. Estudantes 

    Representa estudantes da nossa instituição. Eles devem possuir: id, nome, email, data de nascimento e os principais hobbies dele. 

2. Docente

    Representa docentes da nossa instituição. Eles devem possuir: id, nome, email, data de nascimento e todas as especialidades dele. Há 7 especialidades: React, Redux, CSS, Testes, Typescript, Programação Orientada a Objetos e Backend

3. Turma

    Toda turma é composta das seguintes características: id, nome, data de início, data de término, lista de professores responsáveis, uma lista de alunos e módulo atual em que a turma está.

    O módulo pode assumir os valores de 1 a 7 ou `undefined`, indicando que as aulas dessa turma ainda não começaram. Para esse exercício, vamos considerar que existam dois tipos de turma: integral ou noturna. Há uma restrição para o nome das turmas noturnas: tem que terminar com `-na-night`.

As funcionalidades básicas são:

→ Criar estudante;

→ Criar docente;

→ Criar turma;

→ Adicionar estudante na turma;

→ Adicionar docente na turma;

→ Pegar a idade de algum estudante a partir do id


CREATE TABLE TURMA(
id INT NOT NULL PRIMARY KEY,
nome VARCHAR(50) NOT NULL,
data_inicio DATE NOT NULL,
data_fim DATE NOT NULL,
modulo INT NOT NULL DEFAULT 0
);

CREATE TABLE ESTUDANTE(
id INT NOT NULL PRIMARY KEY,
nome VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
data_nasc DATE NOT NULL,
turma_id INT NOT NULL,
FOREIGN KEY(turma_id) REFERENCES TURMA(id)
);

CREATE TABLE PASSATEMPO(
id INT NOT NULL PRIMARY KEY,
nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE ESTUDANTE_PASSATEMPO(
estudante_id INT NOT NULL,
passatempo_id INT NOT NULL,
PRIMARY KEY (estudante_id,passatempo_id),
FOREIGN KEY (estudante_id) REFERENCES ESTUDANTE(id),
FOREIGN KEY (passatempo_id) REFERENCES PASSATEMPO(id)
);

SELECT * FROM  TURMA;
SELECT * FROM ESTUDANTE;
SELECT * FROM PASSATEMPO;
SELECT * FROM ESTUDANTE_PASSATEMPO;

CREATE TABLE DOCENTE(
id INT NOT NULL PRIMARY KEY,
nome VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
data_nasc DATE NOT NULL,
turma_id INT NOT NULL,
FOREIGN KEY(turma_id) REFERENCES TURMA(id)
);

CREATE TABLE ESPECIALIDADE(
id INT NOT NULL PRIMARY KEY,
nome VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO ESPECIALIDADE(id, nome)
VALUES(1,"React"),
(2,"Redux"),
(3,"CSS"),
(4,"Testes"),
(5,"Typescript"),
(6,"Programacao orientada ao objeto"),
(7,"Backend");

CREATE TABLE DOCENTE_ESPECIALIDADE(
docente_id INT NOT NULL,
especialidade_id INT NOT NULL,
PRIMARY KEY (docente_id,especialidade_id),
FOREIGN KEY (docente_id) REFERENCES DOCENTE(id),
FOREIGN KEY (especialidade_id) REFERENCES ESPECIALIDADE(id)
);

SELECT * FROM DOCENTE;
SELECT * FROM DOCENTE_ESPECIALIDADE;