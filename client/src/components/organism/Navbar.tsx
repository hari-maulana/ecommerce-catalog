import { useState } from "react";
import { Badge, Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useCart } from "../../store/cartContext";
import { Link } from "react-router-dom";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export const NavbarComponent: React.FC<Props> = ({ setSearch }) => {
  const { totalQuantity } = useCart();
  const [searchValue, setSearchValue] = useState("");
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container className="d-flex">
        <Navbar.Brand href="#home" className="fs-3 fw-light">
          E-Catalog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav className="me-auto col-6">
            <Form className="d-flex w-100">
              <Form.Control
                type="search"
                placeholder="Search "
                aria-label="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setSearch(searchValue);
                  }
                }}
                style={{ borderRadius: "25px", width: "100%", marginRight: "10px" }}
              />
              <Button
                variant="secondary"
                onClick={() => setSearch(searchValue)}
                style={{ borderRadius: "25px" }}
              >
                Search
              </Button>
            </Form>
          </Nav>
          <Nav className="">
            <Link to="/cart" className="nav-link">
              Cart <Badge bg="secondary">{totalQuantity}</Badge>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
