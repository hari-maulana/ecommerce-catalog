import { Col, Container, Row } from "react-bootstrap";
import { CategoriesList } from "../organism/CategoriesList";
import { NavbarComponent } from "../organism/Navbar";
import { ProductCard } from "../organism/ProductCard";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../hooks/useFetchProducts";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = category ? product.category === category : true;
      return matchesName && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [search, category, products]);

  return (
    <>
      <NavbarComponent search={search} setSearch={setSearch} />
      <Container className="mt-3">
        <Row className="justify-content-between">
          <Col className="d-none d-md-block col-md-2 vh-50 border border-black-50 rounded">
            <CategoriesList
              category={category}
              setCategory={setCategory}
              products={products}
            />
          </Col>
          <Col className=" col-12 col-md-9 border border-black-50 rounded">
            <p
              className="mt-3 text-center"
              style={{ fontSize: "20px", fontWeight: "400" }}
            >
              ProductList
            </p>
            <Container className="mt-3 d-flex flex-wrap gap-3 justify-content-around mb-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  description={product.description}
                  onClick={() => alert("Add to cart")}
                />
              ))}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
