import { HeaderContainer } from './styles'
import logopomodoro from '../../assets/logopomodoro.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img
        src={logopomodoro}
        alt="Logo Pomodoro, é um imagem que diz Pomodoro com um tomate no meio nas cores azul e rosa"
        title="Logo Pomodoro"
      />
      <nav>
        <NavLink to="/" title="Tempo">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll to={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
