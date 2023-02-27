import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-content: center;
  justify-content: space-between;
  img {
    width: 30%;
  }
  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${(props) => props.theme['pastel-800']};
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['pastel-200']};
      }
      &.active {
        color: ${(props) => props.theme['pastel-200']};
      }
    }
  }
`
