/* eslint-disable react/react-in-jsx-scope */
import { HandPalm, Play } from 'phosphor-react'
import { createContext, useState } from 'react'
import { NewCycle } from './components/NewCycle'
import { CountDown } from './components/CountDown'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  HomeContainer,
  StarCountdownButton,
  StopCountdownButton,
} from './styles'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  starDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

const NewCycleformValidationSchema = zod.object({
    task: zod.string().min(1,'Informe a tarefa'),
    minutesAmount: zod
      .number()
      .min(5,'O ciclo precisa ser no mínimo 5 minutos')
      .max(60,'O ciclo precisa ser no máximo 60 minutos'),
  })
  
  type NewCycleFormData = zod.infer<typeof NewCycleformValidationSchema>

export function Home() {
  const [cycles,setCycles] = useState<Cycle[]>([])
  const[activeCycleId,setactiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(NewCycleformValidationSchema),
    defaultValues:{
      task: '',
      minutesAmount: 0,            
    }
  })
  
  const {handleSubmit, watch, reset} =  newCycleForm

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number){
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleFinished(){
    setCycles((state) =>
      state.map((cycle) => {
      if (cycle.id === activeCycleId) {
          return {...cycle, finishedDate: new Date()}
      }
      else
          return cycle
      }),
  )
  }
  
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
  
  function handleInterruptCycle(){
    setCycles( (state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {...cycle, interruptedDate: new Date()}
        }
        else
          return cycle
      }),
    )
    setactiveCycleId(null)
  }
  
  const task = watch('task')
  const isSubmitDisabled = !task 
  
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider 
          value={{
            activeCycle,
            activeCycleId, 
            markCurrentCycleFinished,
            amountSecondsPassed,
            setSecondsPassed}}>
          <FormProvider {...newCycleForm}>
            <NewCycle />
          </FormProvider>
          <CountDown />
        </CyclesContext.Provider>
        { activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="submit">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StarCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Començar
          </StarCountdownButton>
        ) } 
      </form>
    </HomeContainer>
  )
}