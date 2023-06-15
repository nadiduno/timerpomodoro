/* eslint-disable react/react-in-jsx-scope */
import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from 'react'
import {differenceInSeconds} from 'date-fns'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinuteAmountInput,
  Separator,
  StarCountdownButton,
  TaskInput,
} from './styles'


const NewCycleformValidationSchema = zod.object({
  task: zod.string().min(1,'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5,'O ciclo precisa ser no mínimo 5 minutos')
    .max(60,'O ciclo precisa ser no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof NewCycleformValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  starDate: Date
}

export function Home() {
  const [cycles,setCycles] = useState<Cycle[]>([])
  const[activeCycleId,setactiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
    resolver: zodResolver(NewCycleformValidationSchema),
    defaultValues:{
      task: '',
      minutesAmount: 0,            
    }
  })
  
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(),activeCycle.starDate),
        )
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  },[activeCycle])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      starDate: new Date(),
    }
    
    setCycles((state) => [...state, newCycle])
    setactiveCycleId(id)
    setAmountSecondsPassed(0)
    reset()
  }
   
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0  
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2,'0')
  const seconds = String(secondsAmount).padStart(2,'0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  },[minutes,seconds,activeCycle])
  const task = watch('task')

  const isSubmitDisabled = !task 
  
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
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StarCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Començar
        </StarCountdownButton>
      </form>
    </HomeContainer>
  )
}
