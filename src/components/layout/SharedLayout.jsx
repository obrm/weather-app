import { Outlet } from "react-router";
import Header from '../Header';
import { Col, Container, Row } from 'react-bootstrap';

const SharedLayout = () => {

  return (
    <>
      <Header />
      <Container>
        <Row className='justify-content-md-center mt-5'>
          <Col md='auto'>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SharedLayout;