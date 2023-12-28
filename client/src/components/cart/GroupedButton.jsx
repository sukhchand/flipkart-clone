import React from 'react'
import { Button, ButtonGroup, styled } from '@mui/material'

const Component = styled(ButtonGroup)({
    marginTop: 30,
})

const StyledButton = styled(Button)({
  borderRadius: "50%"
})
export default function GroupedButton() {
  return (
    <Component>
        <StyledButton>-</StyledButton>
        <Button disabled>1</Button>
        <StyledButton>+</StyledButton>
    </Component>
  )
}
