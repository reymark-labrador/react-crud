import { Container, Row, Col } from 'react-bootstrap';

export const Layout: React.FC = ({children}) => {

    return (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col md="11" xl="8" className="my-5">
                    {children}
                </Col>
            </Row>
        </Container>
    );
};