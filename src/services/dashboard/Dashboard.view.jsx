// DashboardView.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Table, Container, Row, Col, Card } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import './Dashboard.css'; // Import your custom styles

function DashboardView({ data, loading, onPageChange, onPerPageChange, perPage }) {
  const [currentPage, setCurrentPage] = useState({ value: 1 });

  useEffect(() => {
    setCurrentPage({ value: 1 }); // Reset currentPage state when component receives new data
  }, [data]);

  const handlePageChange = (selected) => {
    const newPage = selected + 1;
    setCurrentPage({ value: newPage });
    onPageChange(newPage);
  };

  const handlePerPageChange = (e) => {
    const newPerPage = parseInt(e.target.value, 10);
    onPerPageChange(newPerPage);
    debugger;
    setCurrentPage({ value: 1 }); // Reset to the first page when changing the limit
  };

  // Check if data is an array and has the expected structure
  const tableRows = useMemo(() => {
    if (!data || !data.data || !Array.isArray(data.data)) {
      return null; // Return null if the data structure is not as expected
    }

    return data.data.map((client) => (
      <tr key={client.ID}>
        <td>{client.ID}</td>
        <td>{client.name}</td>
        <td>{client.cnpj}</td>
        <td>{client.due_date}</td>
        <td>{client.contact.email}</td>
        <td>
          <a href={`#edit-${client.ID}`}>Editar</a> |{' '}
          <a href={`#delete-${client.ID}`}>Excluir</a>
        </td>
      </tr>
    ));
  }, [data]);

  // Return a message if the data structure is not as expected
  if (!tableRows) {
    return <div>Data structure is not as expected.</div>;
  }

  const totalPages = Math.ceil(data.meta.total / perPage);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Listagem de clientes</Card.Title>
                <p className="card-category">Todos</p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>CNPJ</th>
                      <th>Due Date</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>{tableRows}</tbody>
                </Table>
              </Card.Body>
              <Card.Footer>
                <div className="pagination">
                  <ReactPaginate
                    pageCount={totalPages}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                  />
                  <select onChange={handlePerPageChange} value={perPage}>
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DashboardView;
