import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, Separator, StarCountdownButton } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <input id="task" />
          <label htmlFor="minutesAnount">durante</label>
          <input type="number" id="minutesAnount" />
          <span>minutos</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StarCountdownButton disabled type="submit">
          <Play size={24} />
          Començar
        </StarCountdownButton>
      </form>
    </HomeContainer>
  )
}
