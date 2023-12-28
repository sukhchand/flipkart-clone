import React, { useEffect, useState } from "react";
import { Box, InputBase, List, ListItem, styled } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";
import { Link } from "react-router-dom";

const SearchContainer = styled(Box)({
  background: "#fff",
  width: "38%",
  borderRadius: 2,
  marginLeft: 10,
  display: "flex",
});
const InputBaseSearch = styled(InputBase)({
  paddingLeft: 20,
  width: "100%",
  fontSize: "unset",
});

const SearchIconWrapper = styled(Box)({
  color: "blue",
  padding: 5,
  display: "flex",
});

const ListWrapper = styled(List)({
  position: "absolute",
  background: "#fff",
  color: "#000",
  marginTop: 36,
});

export default function Search() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.getProducts);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const getText = (text) => {
    setText(text);
  };
  return (
    <SearchContainer>
      <InputBaseSearch
        placeholder="Search for products, brands and more"
        onChange={(e) => getText(e.target.value)}
        value={text}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      {text && (
        <ListWrapper>
          {products
            .filter((product) =>
              product.title.longTitle.toLowerCase().includes(text.toLowerCase())
            )
            .map((product) => (
              <ListItem>
                <Link
                  to={`/product/${product.id}`}
                  onClick={() => setText("")}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {product.title.longTitle}
                </Link>
              </ListItem>
            ))}
        </ListWrapper>
      )}
    </SearchContainer>
  );
}
