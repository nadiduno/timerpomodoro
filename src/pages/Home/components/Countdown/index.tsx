/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from "react"
import { differenceInSeconds } from "date-fns"
import { CyclesContext } from "../.."
import { CountdownContainer, Separator } from "./styles"


export function Countdown(){
  const {activeCycle, activeCycleId, markCurrentyAsFinished} = useContext(CyclesContext)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0  
  
  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiference = differenceInSeconds(new Date(),activeCycle.starDate);
        if (secondsDiference >= totalSeconds){
          markCurrentyAsFinished()  
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDiference)
        }
        
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  },[activeCycle, totalSeconds, activeCycleId, markCurrentyAsFinished])
  
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
  

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}