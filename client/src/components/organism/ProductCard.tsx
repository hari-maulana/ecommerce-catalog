import { Button, Card } from "react-bootstrap";

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  description: string;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  image,
  description,
  onClick,
}) => {
  return (
    <Card className="bg-light" style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        style={{ height: "18rem", objectFit: "cover" }}
        src={image}
      />
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Card.Title>{title}</Card.Title>
          <Button>LK</Button>
        </div>

        <Card.Text>{description}</Card.Text>
        <Card.Text>Rp {price}</Card.Text>
        <Button onClick={onClick} variant="primary">
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};
