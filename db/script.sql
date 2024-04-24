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

CREATE TABLE varinha (
    id SERIAL PRIMARY KEY,
    material VARCHAR(100) NOT NULL,
    comprimento INT NOT NULL,
    nucleo VARCHAR(100) NOT NULL,
    data_criacao DATE NOT NULL,
);

-- inserindo dados
INSERT INTO usuarios (nome, idade, casa_hogwarts, habilidade, status_sangue, patrono ) VALUES ('Harry Potter', 17, 'Grifinória', 'Apanhador', 'Mestiço', 'Cervo');

INSERT INTO varinha (material, comprimento, nucleo, data_criacao) VALUES ('Madeira de Teixo', 30, 'Pena de Fênix', '1991-07-31');