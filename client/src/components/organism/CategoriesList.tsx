import { ListGroup } from "react-bootstrap";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

interface Props {
  category: string;
  setCategory: (value: string) => void;
  products: Product[];
}

export const CategoriesList: React.FC<Props> = ({
  category,
  products,
  setCategory,
}) => {
  const categories = [
    "All Categories",
    ...new Set(products.map((p) => p.category)),
  ];

  return (
    <div className="mt-3 ">
      <p
        className=" text-center"
        style={{ fontSize: "20px", fontWeight: "400" }}
      >
        Category
      </p>
      <ListGroup>
        {categories.map((cat, index) => (
          <ListGroup.Item
            key={index}
            action
            active={category === cat}
            onClick={() => setCategory(cat === "All Categories" ? "" : cat)}
          >
            {cat}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

{
  /* <select value={category} onChange={(e) => setCategory(e.target.value)}>
  <option value="">All Categories</option>
  {[...new Set(products.map((p) => p.category))].map((cat) => (
    <option key={cat} value={cat}>
      {cat}
    </option>
  ))}
</select> */
}
