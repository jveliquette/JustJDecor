import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function WishList() {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    }

    return (
        <Container fluid className="ideas-page-container mt-4 mb-5 vh-100 d-flex justify-content-center align-items-center">
          <Row>
            <Col className="text-center">
              <h1 className="display-3">Coming Soon</h1>
              <p className="lead">I am working hard to bring you this feature. Stay tuned!</p>
              <Button variant="primary" size="lg" onClick={handleBackToHome}>
                Back to Home
              </Button>
            </Col>
          </Row>
        </Container>
      );

}
export default WishList;
