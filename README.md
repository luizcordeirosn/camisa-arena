# Camisa Arena

Camisa Arena é um sistema de e-commerce para venda de camisas, utilizando uma arquitetura de microserviços. O projeto é dividido em dois microserviços principais: **Produto** e **Compra**. A comunicação entre esses microserviços é facilitada por uma fila de mensagens implementada com RabbitMQ.

## Visão Geral

- **Microserviço de Produto**: Gerencia informações sobre os produtos disponíveis, como nome, descrição, preço e estoque.
- **Microserviço de Compra**: Trata das operações relacionadas às compras, como criação de pedidos, processamento de pagamentos e atualização de estoque.

## Arquitetura

1. **Microserviço de Produto**
   - **Tecnologias**: [Java, Spring Boot, PostgreSQL]
   - **Funcionalidades**:
     - Cadastro, atualização e exclusão de produtos.
     - Consulta de produtos disponíveis.

2. **Microserviço de Compra**
   - **Tecnologias**: [Typescript, Nest.js, Prisma, PostgreSQL]
   - **Funcionalidades**:
     - Criação e gerenciamento de pedidos.
     - Atualização do status do pedido e estoque.

3. **Comunicação entre Microserviços**
   - **RabbitMQ**: Utilizado para a troca de mensagens entre os microserviços, permitindo que eventos como a atualização de estoque e a criação de pedidos sejam comunicados de forma assíncrona.
