import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useState } from 'react';

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinuteAmountInput,
  Separator,
  StarCountdownButton,
  TaskInput,
} from './styles'


export function Home() {
  const {register, handleSubmit, watch} = useForm()
  
  function handleCreateNewCycle(data: any) {
    console.log(data)
  }
  
  const task = watch('task');
  const isSubmitDisabled = !task; 
  
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            list="task-suggestions" 
            placeholder="Dê um nome para o seu projeto"
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
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StarCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Començar
        </StarCountdownButton>
      </form>
    </HomeContainer>
  )
}
