import React, { useRef , useState} from 'react';
import { Jumbotron, Button, Card, Col, Container, Form, Accordion, Table } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const name = useRef(null);
  const email = useRef(null);
  const telefone = useRef(null);
  const valor = useRef(0);
  const tempo = useRef(0);

  const [value, setValue] = useState('');
  const handleChangeValue = (e) => setValue(e.target.value);

  const [time, setTime] = useState('');
  const handleChangeTime = (e) => setTime(e.target.time);

  const taxaPoup = (1.4/100) * value;
  const taxaCDI = (1.8/100) * value;
  const taxaCDB = (1.98/100) * value;
  
  //Fazer calculo de juros composto
  const CDI = taxaCDI;
  const POUP = taxaPoup;
  const CDB = taxaCDB;

  function handleClick(e, valor, tempo) {
    e.preventDefault();

    axios({
      method: 'post',
      url: 'http://localhost:8080',
      data: {
        nome: name.current.value,
        telefone: telefone.current.value,
        email: email.current.value,
        valor: valor.current.value,
        tempo: tempo.current.value
      }
    })
    .then((response) => {
      console.log(response,axios.data);
    }, (error) => {
      console.log(error);
    });
  }

  return (
    <div className="App">
      <Container>
        <Jumbotron>
          <h1>Desafio EQI!</h1>
          <p>
          Simulador de Investimentos para calcular a rentabilidade de investimentos. 
          Uma simulação e comparação entre os investimentos CDB e Poupança e destacar o investimento 
          com maior rentabilidade.
          </p>
        </Jumbotron>

        <Form>
          <Form.Row >
            <Col sm={3}>
            <Form.Group >
                <Form.Label>Informção do investidor!</Form.Label>
                <Form.Control ref={name} placeholder="Nome" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control ref={email} placeholder="Email" />
              </Form.Group>
              <Form.Group controlId="formBasicTelefone">
                <Form.Control ref={telefone} placeholder="Telefone" />
              </Form.Group>
              {/* <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Deseja receber informações de investimento?" />
              </Form.Group> */}
            </Col>
            <Col sm={1}></Col>
            <Col sm={3}>
              <Form.Group controlId="formBasicValor">
              <Form.Label>Quanto você quer investir hoje?</Form.Label>
                <Form.Control type="number"
                 value={value} onChange={handleChangeValue} 
                 ref={valor} placeholder="Valor sem casa decimal" />
              </Form.Group>
            </Col>
            <Col sm={1}></Col>
            <Col sm={3}> 
              <Form.Group controlId="formBasicAnos">
              <Form.Label>Por quanto tempo você pretende deixar o seu dinheiro investido?</Form.Label>
                <Form.Control ref={tempo} type="number"
                value={time} onChange={handleChangeTime} 
                placeholder="Em anos" />
              </Form.Group>
              <Button 
                variant="primary" 
                type="submit"
                onClick={handleClick}>
                Calcular!
              </Button>

            </Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>CDI</th>
                  <th>Poupança</th>
                  <th>CDBpos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Valor:</td>
                  <td>${CDI}</td>  
                  <td>${POUP}</td>  
                  <td>${CDB}</td>
                  {/* <td>${((valor.current.value/100*1.8) * tempo.current.value) + valor.current.value}</td>
                  <td>${((valor.current.value/100*1.4) * tempo.current.value) + valor.current.value}</td>
                  <td>${((valor.current.value/100*1.98) * tempo.current.value) + valor.current.value}</td> */}
                </tr>
              </tbody>
            </Table>

          </Form.Row>
        </Form>

        <Accordion>
          <Card
          style={{ width: '30rem' }}>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Referencia das taxas
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
              <Card.Text>Taxa CDI - 1,8% (ao ano)</Card.Text>
            <Card.Text>Taxa Poupança - 1,40% (no ano)</Card.Text>
            <Card.Text>Referencia CDBpos - 110% do CDI (1,98% ao ano) </Card.Text>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
         
        </Accordion>

      </Container>
    </div>
  );
}

export default App;