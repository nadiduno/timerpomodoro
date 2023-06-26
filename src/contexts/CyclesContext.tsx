/* eslint-disable react/react-in-jsx-scope */
import { ReactNode, createContext, useState } from "react";

interface CretateCycleData {
    task: string
    minutesAmount: number
}

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    starDate: Date
    interruptedDate?: Date
    finishedDate?: Date
  }
  
interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleFinished: () => void
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CretateCycleData) => void
    interruptCurrentCycle: () => void
  }
  
interface CyclesContextProvideProps{
    children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ 
  children,
}: CyclesContextProvideProps){
    const [cycles,setCycles] = useState<Cycle[]>([])
    const[activeCycleId,setactiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
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
      function createNewCycle(data: CretateCycleData) {
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
      }
      
      function interruptCurrentCycle(){
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
        

    return(
        <CyclesContext.Provider 
            value={{
              cycles,
              activeCycle,
              activeCycleId, 
              markCurrentCycleFinished,
              amountSecondsPassed,
              setSecondsPassed,
              createNewCycle,
              interruptCurrentCycle
            }}
        >  
            {children}  
        </CyclesContext.Provider>
    )
}