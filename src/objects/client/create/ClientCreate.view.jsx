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
    name: "",
    name_social: "",
    cnpj: "",
    contact: {
      email: "",
      phone: "",
    },
    due_date: 0,
    address: {
      cep: "",
      logradouro: "",
      bairro: "",
      localidade: "",
      uf: "",
      complement: "",
    },
    calc: {
      number_clients: 0,
      value: 0,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name.includes('.')) {
      const [nestedKey, nestedProp] = name.split('.');
      setFormData((prevData) => ({
        ...prevData,
        [nestedKey]: {
          ...prevData[nestedKey],
          [nestedProp]: ['due_date', 'value', 'number_clients'].includes(nestedProp) ? Number(value) : value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: ['due_date', 'calc.value', 'calc.number_clients'].includes(name) ? Number(value) : value,
      }));
    }
  };  
  

  const handleCEPChange = async (event) => {
    const enteredCEP = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (enteredCEP.length === 8) {
      try {
        const response = await fetch(`http://localhost:3001/api/address/${enteredCEP}`);
        if (response.ok) {
          const result = await response.json();
          setFormData((prevData) => ({
            ...prevData,
            address: {
              ...prevData.address,
              cep: enteredCEP,
              logradouro: result.data.logradouro || "",
              bairro: result.data.bairro || "",
              localidade: result.data.localidade || "",
              uf: result.data.uf || "",
            },
          }));
        } else {
          console.error("Failed to fetch address data");
        }
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    }
  };  

  const handleSubmit = async (event) => {
    event.preventDefault();

    formatedData = {
      ...formData,
      due_date: Number(formData.due_date),
    }
    try {
      const response = await fetch("http://localhost:3001/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formatedData),
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
                          name="name"
                          value={formData.name}
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
                          name="name_social"
                          value={formData.name_social}
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
                          name="contact.email"
                          value={formData.contact.email}
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
                          name="phone"
                          value={formData.contact.phone}
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
                          value={formData.address.cep}
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
                          value={formData.address.logradouro}
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
                          value={formData.address.bairro}
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
                          value={formData.address.localidade}
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
                          value={formData.address.uf}
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
                          value={formData.address.complemento}
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
                          name="calc.number_clients"
                          value={formData.calc.number_clients}
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
                          name="calc.value"
                          value={formData.calc.value}
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
                          name="due_date"
                          value={Number(formData.due_date)}
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
