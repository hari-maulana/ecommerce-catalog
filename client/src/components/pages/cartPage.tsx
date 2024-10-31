import { Col, Container, Row } from "react-bootstrap";
import { useCart } from "../../store/cartContext";
import { NavbarComponent } from "../organism/Navbar";
import { OrderSummary } from "../organism/OrderSummary";
import { useFormatPrice } from "../../utils/useLocalPriceFormat";

const cartPage = () => {
  const { cartItems } = useCart();
  console.log(cartItems);

  return (
    <>
      <NavbarComponent search="" setSearch={() => {}} />
      <Container className="mt-3">
        <Row className="justify-content-between gap-3">
          <Col className="col-12 col-md-7">
            <p className="fw-bold">Order List</p>
            {cartItems.map((item) => (
              <div key={item.id} className="rounded p-3 bg-light mb-3 border">
                <Row className="justify-content-between">
                  <Col className="col-2">
                    <img
                      style={{ width: "100%", borderRadius: "5px" }}
                      src={item.image}
                      alt="product image"
                    />
                  </Col>
                  <Col className="col-6">
                    <p className="fw-bold mb-0">{item.name}</p>
                    <p className="text-secondary">{item.description}</p>
                    <p className="mb-0">{useFormatPrice(item.price)}</p>
                  </Col>
                </Row>
              </div>
            ))}
          </Col>
          <Col className="col-12 col-md-4">
            <OrderSummary />
          </Col>
        </Row>
      </Container>
      {/* <div>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>{" "}
        {cartItems.map((item: CartItem) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <p>{item.quantity}</p>
          </div>
        ))}
      </div> */}
    </>
  );
};

export default cartPage;
