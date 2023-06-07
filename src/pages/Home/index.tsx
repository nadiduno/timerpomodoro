import { Play } from "phosphor-react";

export function Home() {
  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="task">Vou trabalhar em</label>
          <input id="task" />
          <label htmlFor="minutesAnount">durante</label>
          <input type="number" id="minutesAnount" />
          <span>minutos</span>
        </div>

        <div>
          <span>0</span>
          <span>0</span>
          <span>:</span>
          <span>0</span>
          <span>0</span>
        </div>

        <button type="submit">
          <Play size={24}/>
          Començar
        </button>
      
      </form>
    </div>
  )
}
