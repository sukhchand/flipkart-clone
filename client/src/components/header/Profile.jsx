import { PowerSettingsNew } from "@mui/icons-material";
import { Box, Menu, MenuItem, Typography, styled } from "@mui/material";
import React, { useState } from "react";

const Component = styled(Menu)({
    marginTop: 5
})

const Logout =styled(Typography)({
    fontSize: 14,
    marginLeft: 20
})

export default function Profile({ account, setAccount }) {
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const logoutUser = () => {
    setAccount('')
  }
  return (
    <>
      <Box onClick={handleClick}>
        <Typography style={{marginTop: 2, cursor: "pointer"}}>{account}</Typography>
      </Box>
      <Component
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
      >
        <MenuItem onClick={(e)=>{handleClose(e); logoutUser();}}>
            <PowerSettingsNew color="primary" fontSize="small" />
            <Logout>Logout</Logout>
        </MenuItem>
      </Component>
    </>
  );
}
