import { Box, Button, Typography, styled } from "@mui/material";
import React from "react";
import { addEllipsis } from "../../utils/common-utils";
import GroupedButton from "./GroupedButton";
import { useDispatch } from "react-redux";
import {removeFromCart} from "../../redux/actions/cartActions"

const Component = styled(Box)({
  borderTop: "1px solid #f0f0f0",
  display: "flex",
  background: "#fff",
});

const LeftComponent = styled(Box)({
  margin: 20,
  display: "flex",
  flexDirection: "column",
});

const SmallText = styled(Typography)({
  color: "#878787",
  fontSize: 14,
  marginTop: 10,
});

const Remove = styled(Button)({
  marginTop: 20,
  fontSize: 16,
  color: "#000",
  fontWeight: 600,
});
export default function CartItem({ item }) {
  const fassured =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";
  const dispatch = useDispatch();
  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <Component>
      <LeftComponent>
        <img src={item.url} style={{ height: 110, width: 110 }} alt="product" />
        <GroupedButton />
      </LeftComponent>
      <Box style={{ margin: 20 }}>
        <Typography>{addEllipsis(item.title.longTitle)}</Typography>
        <SmallText>
          Seller: RetailNet
          <Box component="span">
            <img
              src={fassured}
              alt="flipkart"
              style={{ width: 50, marginLeft: 10 }}
            />
          </Box>
        </SmallText>
        <Typography style={{ margin: "20px 0" }}>
          <Box component="span" style={{ fontWeight: 600, fontSize: 18 }}>
            ₹{item.price.cost}
          </Box>
          &nbsp;&nbsp;&nbsp;
          <Box component="span" style={{ color: "#878787" }}>
            <strike>₹{item.price.mrp}</strike>
          </Box>
          &nbsp;&nbsp;&nbsp;
          <Box component="span" style={{ color: "#388e3c" }}>
            {item.price.discount}
          </Box>
          &nbsp;&nbsp;&nbsp;
        </Typography>
        <Remove onClick={() => removeItemFromCart(item.id)}>Remove</Remove>
      </Box>
    </Component>
  );
}
