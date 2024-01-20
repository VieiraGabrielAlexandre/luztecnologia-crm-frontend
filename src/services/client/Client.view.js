import React from 'react';
import { Table, Container, Row, Col, Card } from 'react-bootstrap';

function Dashboard() {
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Listagem de clientes</Card.Title>
              <p className="card-category"></p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Nome</th>
                    <th className="border-0">CNPJ</th>
                    <th className="border-0">Dt. Vencimento</th>
                    <th className="border-0">E-mail</th>
                    <th className="border-0">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((client) => (
                    <tr key={client.ID}>
                      <td>{client.ID}</td>
                      <td>{client.name}</td>
                      <td>{client.cnpj}</td>
                      <td>{client.due_date}</td>
                      <td>{client.contact.email}</td>
                      <td>
                        <a href={`/edit/${client.ID}`}>Editar</a> |{' '}
                        <a href="#" onClick={() => handleDelete(client.ID)}>
                          Excluir
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        {/* Add more columns or components as needed */}
      </Row>
    </Container>
  );
}

export default Dashboard;
