import React from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { timeFormatter, phoneNumberFormatter } from '../../helper-functions/helpers';

export const ReservationCard = ({e, i, handleEditClick}) => {
  return (
      <Card key={e.id} className="border border-info mb-3 p-3">
          <Card.Header>
              <strong>Time:</strong>
              {"  "}
              {timeFormatter(e.time)}
          </Card.Header>
          <Card.Body></Card.Body>
          <Card.Text>
              <strong>Name:</strong>
              {"  "}
              {`${e.firstName} ${e.lastName}`}
          </Card.Text>
          <Row xs={1} md={2}>
              <Col>
                  <Card.Text>
                      <strong>Phone:</strong>
                      {"  "}
                      {phoneNumberFormatter(e.phoneNumber)}
                  </Card.Text>
              </Col>
              <Col>
                  <Card.Text>
                      <strong>Guests:</strong>
                      {"  "}
                      {e.numGuests}
                  </Card.Text>
              </Col>
          </Row>
          <Button className="mt-4" id={i} onClick={handleEditClick}>
              Edit
          </Button>
      </Card>
  );
}
