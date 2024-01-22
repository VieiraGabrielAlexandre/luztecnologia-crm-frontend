// DashboardView.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Table, Container, Row, Col, Card } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import './Dashboard.css';

function DashboardView({ data, loading, onPageChange, onPerPageChange, perPage, currentPageProp }) {
  const [currentPage, setCurrentPage] = useState(currentPageProp);

  useEffect(() => {
    setCurrentPage(currentPageProp);
  }, [data, currentPageProp]);

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected + 1);
    onPageChange(selected.selected + 1);
  };

  const handlePerPageChange = (e) => {
    const newPerPage = parseInt(e.target.value, 10);
    onPerPageChange(newPerPage);
  };

  const tableRows = useMemo(() => {
    if (!data || !data.data || !Array.isArray(data.data)) {
      return null;
    }

    return data.data.map((client) => (
      <tr key={client.ID}>
        <td>{client.ID}</td>
        <td>{client.name}</td>
        <td>{client.cnpj}</td>
        <td>{client.due_date}</td>
        <td>{client.contact.email}</td>
        <td>
          <a href={`#edit-${client.ID}`}>Editar</a>
        </td>
      </tr>
    ));
  }, [data]);

  const totalClientes = useMemo(() => {

    return (
        <span>{data.meta.total}</span>
    );
  }, [data]);


  if (!tableRows) {
    return <div>Data structure is not as expected.</div>;
  }

  const totalPages = Math.ceil(data.meta.total / perPage);

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Qtd. Clientes</p>
                      <Card.Title as="h4">{totalClientes}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
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
                    marginPagesDisplayed={3}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    initialPage={currentPage - 1}
                  />
                  <select onChange={handlePerPageChange} value={perPage}>
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
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
