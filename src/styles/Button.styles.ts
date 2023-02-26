import styled from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 10rem;
  height: 10rem;
  padding: 2rem;
  margin: 1rem;
  background-color: ${(props) => props.theme.primary};
`
