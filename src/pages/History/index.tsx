/* eslint-disable react/react-in-jsx-scope */
import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

export function History() {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <pre>{JSON.stringify(cycles,null,2)}</pre>
    <HistoryList>
      <table>
        <tr>
          <th>Tarefa</th>
          <th>Duração</th>
          <th>Início</th>
          <th>Status</th>
        </tr>
        <tbody>
          <tr>
            <td>Projeto 1</td>
            <td>20 minutos</td>
            <td>Há 2 meses</td>
            <td>
              <Status statusColor="green">Concluido</Status>
            </td>
          </tr>
        </tbody>
      </table>
    </HistoryList>
    </HistoryContainer>
  )
}
