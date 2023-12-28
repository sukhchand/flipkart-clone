import { Box, Button, styled } from "@mui/material";
import React, { useState } from "react";
import { ShoppingCart as Cart } from "@mui/icons-material";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { payUsingPaytm } from "../../service/api";
import { post } from "../../utils/paytm";

const LeftContainer = styled(Box)(({theme}) => ({
  minWidth: "40%",
  padding: "40px 0 0 80px",
  [theme.breakpoints.down('lg')] : {
    padding: "20px 40px"
  }
}));

const Image = styled("img")({
  padding: 15
});

const StyleButton = styled(Button)(({theme}) => ({
  width: "48%",
  height: 50,
  borderRadius: 2,
  [theme.breakpoints.down('lg')]: {
    width: "46%"
  }, 
  [theme.breakpoints.down("sm")] : {
    width: "48%"
  }
}));

export default function ActionItem({ product }) {
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = product
  const addItemToCart = () => {
    dispatch(addToCart(id, quantity))
    navigate("/cart")
  }

  const buyNow = () =>{
    let response = payUsingPaytm({amount: 500, email: "sukhchand38@gmail.com"})
    let information = {
      action: "https://securegw-stage.paytm.in/order/process",
      params: response
    }
    post(information)
  }
  return (
    <LeftContainer>
      <Box style={{ padding: "15px 20px", border: "1px solid #f0f0f0", width: "90%" }}>
        <Image src={product.detailUrl} alt="product" />
      </Box>
      <StyleButton
        variant="contained"
        style={{ marginLeft: 10, background: "#ff9f00" }}
        onClick={() => addItemToCart()}
      >
        <Cart /> Add to Cart
      </StyleButton>
      <StyleButton onClick={() => buyNow()} variant="contained" style={{ background: "fb541b" }}>
        <FlashOnIcon />
        Buy Now
      </StyleButton>
    </LeftContainer>
  );
}
