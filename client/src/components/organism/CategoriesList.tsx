import { ListGroup } from "react-bootstrap";

export const CategoriesList = () => {
  return (
    <div className="mt-3">
      <p
        className="text-center"
        style={{ fontSize: "20px", fontWeight: "400" }}
      >
        Category
      </p>
      <ListGroup defaultActiveKey="#link1">
        <ListGroup.Item action href="#link1">
          Footwear
        </ListGroup.Item>
        <ListGroup.Item action href="#link2">
          Outer
        </ListGroup.Item>
        <ListGroup.Item action href="#link3">
          Shirt
        </ListGroup.Item>
        <ListGroup.Item action href="#link4">
          Pants & Shorts
        </ListGroup.Item>
        <ListGroup.Item action href="#link5">
          Bag
        </ListGroup.Item>
        <ListGroup.Item action href="#link6">
          Accessories
        </ListGroup.Item>
        <ListGroup.Item>This one is a button</ListGroup.Item>
      </ListGroup>
    </div>
  );
};
