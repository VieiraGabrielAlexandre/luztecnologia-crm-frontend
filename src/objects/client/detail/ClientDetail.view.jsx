import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

function ClientDetailView({ data, loading }) {
  const {
    name = data.name || "",
    name_social = data.name_social || "",
    contact = {
      email: data.contact.email,
      phone: data.contact.phone
    },
    cnpj = data.cnpj,
    address = {
      cep: data.address?.cep || "",
      logradouro: data.address?.logradouro || "",
      bairro: data.address?.bairro || "",
      localidade: data.address?.localidade || "",
      uf: data.address?.uf || "",
      complement: data.address?.complement || ""
    },
    monthly_value = data.monthly_value || 0,
    due_date = data.due_date || "",
    calc = {
      number_clients: data.calc.number_clients,
      value: data.calc.value
    }
  } = data || {};

  const formatCEP = (cep) => {
    if (!cep) return "";
    return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  };

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

  const [showAlert, setShowAlert] = useState(false);
  const [loadingNotification, setLoadingNotification] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (showAlert) {
      setLoadingNotification(true);

      const alertTimeout = setTimeout(() => {
        setLoadingNotification(false);
        setShowAlert(false);
        history.push("/client-list"); // Update the route as needed
      }, 5000); // Adjust the duration as needed (5 seconds in this example)

      return () => {
        clearTimeout(alertTimeout);
      };
    }
  }, [showAlert]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name.includes('.')) {
      const [nestedKey, nestedProp] = name.split('.');
      setFormData((prevData) => ({
        ...prevData,
        [nestedKey]: {
          ...prevData[nestedKey],
          [nestedProp]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
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
              cep: formatCEP(enteredCEP), // Update the CEP here
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

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
                <Card.Title as="h4">Editar/Visualizar - Cliente</Card.Title>
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
                        />
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
                        />
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
                          isInvalid={!isValidEmail(formData.contact.email)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>CNPJ</label>
                        <Form.Control
                          placeholder="CNPJ"
                          type="text"
                          name="cnpj"
                          value={formData.cnpj}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Telefone</label>
                        <Form.Control
                          placeholder="Telefone"
                          type="phone"
                          name="contact.phone"
                          value={formatPhone(formData.contact.phone)}
                          maxLength="15"
                          onChange={handleInputChange}
                        />
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
                          name="address.cep"
                          value={formatCEP(formData.address.cep)}
                          onChange={handleCEPChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Logradouro</label>
                        <Form.Control
                          placeholder="Logradouro"
                          type="text"
                          name="address.logradouro"
                          value={formData.address.logradouro}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Bairro</label>
                        <Form.Control
                          placeholder="Bairro"
                          type="text"
                          name="address.bairro"
                          value={formData.address.bairro}
                          onChange={handleInputChange}
                        />
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
                          name="address.localidade"
                          value={formData.address.localidade}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>UF</label>
                        <Form.Control
                          placeholder="UF"
                          type="text"
                          name="address.uf"
                          value={formData.address.uf}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Complemento</label>
                        <Form.Control
                          placeholder="Complemento"
                          type="text"
                          name="address.complement"
                          value={formData.address.complement}
                          onChange={handleInputChange}
                        />
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
                        />
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Valor mensal (R$)</label>
                        <Form.Control
                          placeholder="Valor mensal"
                          type="number"
                          step="0.1"
                          name="monthly_value"
                          value={formData.monthly_value}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Dia de vencimento</label>
                        <Form.Control
                          placeholder="Dia de vencimento"
                          type="number"
                          name="due_date"
                          value={formData.due_date}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {showAlert && (
          <Alert
            variant="success"
            show={loadingNotification}
            onClose={() => setShowAlert(false)}
          >
            <span>
              {!loadingNotification ? (
                <>
                  <b>Carregando... -</b>
                </>
              ) : (
                <>
                  <b>Sucesso -</b> Redirecionando para listagem
                </>
              )}
            </span>
          </Alert>
        )}
      </Container>
    </>
  );
}

export default ClientDetailView;
