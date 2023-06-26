/* eslint-disable react/react-in-jsx-scope */
import { HandPalm, Play } from 'phosphor-react'
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
import { CyclesContext } from '../../contexts/CyclesContext'
import { useContext } from 'react'

const NewCycleformValidationSchema = zod.object({
    task: zod.string().min(1,'Informe a tarefa'),
    minutesAmount: zod
      .number()
      .min(5,'O ciclo precisa ser no mínimo 5 minutos')
      .max(60,'O ciclo precisa ser no máximo 60 minutos'),
  })
  
  type NewCycleFormData = zod.infer<typeof NewCycleformValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle} = useContext(CyclesContext)
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(NewCycleformValidationSchema),
    defaultValues:{
      task: '',
      minutesAmount: 0,            
    }
  })
  
  const {handleSubmit, watch /*reset*/} =  newCycleForm
  
  const task = watch('task')
  const isSubmitDisabled = !task 
  
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)} action="">
        <FormProvider {...newCycleForm}>
            <NewCycle />
          </FormProvider>
          <CountDown />
        { activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="submit">
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