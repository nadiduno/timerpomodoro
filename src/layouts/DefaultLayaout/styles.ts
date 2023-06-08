import styled from 'styled-components'

export const LayaoutContainer = styled.div`
  max-width: 74rem;
  height: calc(100vh - 1rem);
  margin: 5rem auto;
  padding: 2.5rem;
  background: ${(props) => props.theme.white};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`
