import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
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
          <tr>
            <td>Projeto 1</td>
            <td>20 minutos</td>
            <td>Há 2 meses</td>
            <td>
              <Status statusColor="green">Concluido</Status>
            </td>
          </tr>
          <tr>
            <td>Projeto 2</td>
            <td>20 minutos</td>
            <td>Há 2 meses</td>
            <td>
              <Status statusColor="yellow">Em andamento</Status>
            </td>
          </tr>
          <tr>
            <td>Projeto 3</td>
            <td>20 minutos</td>
            <td>Há 2 meses</td>
            <td>
              <Status statusColor="red">Iterrumpido</Status>
            </td>
          </tr>
        </tbody>
      </table>
    </HistoryList>
    </HistoryContainer>
  )
}
