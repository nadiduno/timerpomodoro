/* eslint-disable react/react-in-jsx-scope */
import { useFormContext } from "react-hook-form";
import { FormContainer, MinuteAmountInput, TaskInput } from "./styles";
import { useContext } from 'react';
import { CyclesContext } from "../..";

export function NewCycle(){
    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()
    return(
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            list="task-suggestions" 
            placeholder="Dê um nome para o seu projeto"
            disabled={!!activeCycle}
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>
          <label htmlFor="minutesAnount">durante</label>
          <MinuteAmountInput
            type="number"
            id="minutesAnount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos</span>
        </FormContainer>
    )
}