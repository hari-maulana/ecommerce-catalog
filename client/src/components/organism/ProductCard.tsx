import { Button, Card } from "react-bootstrap";
import { useCart } from "../../store/cartContext";

interface ProductCardProps {
  id: number;
  image: string;
  price: number;
  name: string;
  description: string;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  description,
}) => {
  const { addItemToCart } = useCart();

  const handleAddToCart = () => {
    addItemToCart({
      id: id,
      image: image,
      description: description,
      name: name,
      price: price,
      quantity: 1,
    });
    alert("Product added to cart!");
  };

  return (
    <Card className="" style={{ width: "15rem" }}>
      <Card.Img
        variant="top"
        style={{ height: "15rem", objectFit: "contain" }}
        src={image}
      />
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Card.Title>{name}</Card.Title>
          <Button>LK</Button>
        </div>

        <Card.Text>{description}</Card.Text>
        <Card.Text>Rp {price}</Card.Text>
        <Button onClick={handleAddToCart} variant="primary">
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};
