import { Col, Row } from "react-bootstrap";
import { useCart } from "../../store/cartContext";
import { useFormatPrice } from "../../utils/useLocalPriceFormat";

export const OrderSummary = () => {
  const { totalPrice, totalQuantity } = useCart();
  return (
    <>
      <p className="fw-bold">Order Summary</p>
      <Col className="border rounded p-3">
        <Row className="justify-content-between">
          <Col className="">
            <p className="">
              Subtotal <span className="fw-light">({totalQuantity} items)</span>
            </p>
            <p>Discount</p>
            <p>Shipping Cost</p>
            <p className="fw-bold">Total</p>
          </Col>
          <Col className="">
            <p className="text-secondary">{useFormatPrice(totalPrice)}</p>
            <p className="text-success">{useFormatPrice(0)}</p>
            <p className="text-secondary">Free</p>
            <p className="fw-bold">{useFormatPrice(totalPrice)}</p>
          </Col>
        </Row>
        <button className="btn btn-primary w-100 mb-2 mt-3">Checkout</button>
      </Col>
    </>
  );
};
