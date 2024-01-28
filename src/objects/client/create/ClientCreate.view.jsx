import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";

function ClientCreateView() {
  const [formData, setFormData] = useState({
    name,
    name_social,
    cnpj,
    contact: {
      email: contact.email,
      phone: contact.phone,
    },
    monthly_value,
    due_date,
    address: { 
      cep: address.cep,
      logradouro: address.logradouro,
      bairro: address.bairro,
      localidade: address.localidade,
      uf: address.uf,
      complement: address.complement,
     },
    calc,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCEPChange = async (e) => {
    const cep = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
          throw new Error(`Failed to fetch address details. Status: ${response.status}`);
        }
        const data = await response.json();
        const { logradouro, bairro, localidade, uf } = data;
        setFormData({
          ...formData,
          cep,
          logradouro,
          bairro,
          localidade,
          uf,
        });
      } catch (error) {
        console.error("Error fetching address details:", error.message);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Request successful:", result);

        // Show success alert
        setShowAlert(true);

        // Set a timer to hide the alert and redirect
        setTimeout(() => {
          setShowAlert(false);
          window.location.reload(false);        
        }, 5000); // Adjust the duration as needed (5 seconds in this example)

      } else {
        console.error("Request failed with status:", response.status);
        // Handle errors or failed requests
      }
    } catch (error) {
      console.error("Error during the request:", error);
      // Handle network errors or other exceptions
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h4">Criar - Cliente</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Nome Fantasia</label>
                        <Form.Control
                          placeholder="Nome Fantasia"
                          type="text"
                          name="nomeFantasia"
                          value={formData.nomeFantasia}
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Razão Social</label>
                        <Form.Control
                          placeholder="Razão Social"
                          type="text"
                          name="razaoSocial"
                          value={formData.razaoSocial}
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="Contato">Contato</label>
                        <Form.Control
                          placeholder="E-mail"
                          type="email"
                          name="contatoEmail"
                          value={formData.contatoEmail}
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>CNPJ</label>
                        <Form.Control
                          placeholder="CNPJ"
                          type="text"
                          name="cnpj"
                          value={formData.cnpj}
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Telefone</label>
                        <Form.Control
                          placeholder="Telefone"
                          type="phone"
                          maxLength="15"
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>CEP</label>
                        <Form.Control
                          placeholder="CEP"
                          type="text"
                          maxLength="9"
                          name="cep"
                          value={formData.cep}
                          onChange={handleCEPChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Logradouro</label>
                        <Form.Control
                          placeholder="Logradouro"
                          type="text"
                          name="logradouro"
                          value={formData.logradouro}
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Bairro</label>
                        <Form.Control
                          placeholder="Bairro"
                          type="text"
                          name="bairro"
                          value={formData.bairro}
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Localidade</label>
                        <Form.Control
                          placeholder="Localidade"
                          type="text"
                          name="localidade"
                          value={formData.localidade}
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>UF</label>
                        <Form.Control
                          placeholder="UF"
                          type="text"
                          name="uf"
                          value={formData.uf}
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Complemento</label>
                        <Form.Control
                          placeholder="Complemento"
                          type="text"
                          name="complemento"
                          value={formData.complemento}
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Quantidade de clientes</label>
                        <Form.Control
                          placeholder="Quantidade de clientes"
                          type="number"
                          name="quantidadeClientes"
                          value={formData.quantidadeClientes}
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Valor mensal (R$)</label>
                        <Form.Control
                          placeholder="Valor mensal"
                          type="number"
                          step="0.1"
                          name="valorMensal"
                          value={formData.valorMensal}
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Dia de vencimento</label>
                        <Form.Control
                          placeholder="Dia de vencimento"
                          type="number"
                          name="diaVencimento"
                          value={formData.diaVencimento}
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Criar Cliente
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ClientCreateView;
