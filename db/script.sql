-- criação do banco
CREATE DATABASE harrypotter;

-- acessando o banco
\c harrypotter;

-- crianso a tabela
CREATE TABLE bruxo (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    casa_hogwarts VARCHAR(100) NOT NULL,
    habilidade VARCHAR(100) NOT NULL,
    status_sangue VARCHAR(7) NOT NULL,
    patrono VARCHAR(100),
);

-- inserindo dados
INSERT INTO usuarios (nome, idade, casa_hogwarts, habilidade, status_sangue, patrono ) VALUES ('Harry Potter', 17, 'Grifinória', 'Apanhador', 'Mestiço', 'Cervo');