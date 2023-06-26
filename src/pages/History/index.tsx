/* eslint-disable react/react-in-jsx-scope */
import { useContext } from "react";
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

export function History() {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
    <HistoryList>
      <table>
        <tr>
          <th>Tarefa</th>
          <th>Duração</th>
          <th>Início</th>
          <th>Status</th>
        </tr>
        <tbody>
          {cycles.map((cycle) => {
            return(
              <tr key = {cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>{formatDistanceToNow(cycle.starDate, {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </td>
                <td>
                  {cycle.finishedDate && (
                    <Status statusColor="green">Concluido</Status>
                  )}
                  {cycle.interruptedDate && (
                    <Status statusColor="red">Interrompido</Status>
                  )}
                  {!cycle.finishedDate && !cycle.interruptedDate && (
                    <Status statusColor="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </HistoryList>
    </HistoryContainer>
  )
}
