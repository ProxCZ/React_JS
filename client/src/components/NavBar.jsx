import {useNavigate} from "react-router-dom"
import Navbar from "react-bootstrap/Navbar";
import {Container, Nav, Offcanvas} from "react-bootstrap";
import "./NavBar.css";
import {getLabel} from "../helpers/helper";
function NavBar() {

    let navigate = useNavigate();

    return (
        <div className="NavBar">
            <Navbar
                fixed="top"
                expand={"sm"}
                className="NavBar mb-3"
                bg="dark"
                variant="dark"
            >
                <Container fluid>
                    <Navbar.Brand onClick={() => navigate("/")}>
                        {getLabel("TITLE_COOKBOOK")}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
                    <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                                {getLabel("TITLE_COOKBOOK")}
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link onClick={() => navigate("/")}>
                                {getLabel("TITLE_HOME")}
                            </Nav.Link>
                            <Nav.Link onClick={() => navigate("/recipes")}>
                                {getLabel("TITLE_RECIPES")}
                            </Nav.Link>
                            <Nav.Link onClick={() => navigate("/ingredients")}>
                                {getLabel("TITLE_INGREDIENTS")}
                            </Nav.Link>
                        </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
        );
}

export default NavBar