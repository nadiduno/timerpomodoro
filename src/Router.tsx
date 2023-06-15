/* eslint-disable react/react-in-jsx-scope */
import { Routes, Route } from 'react-router-dom'
import { DefaultLayaout } from './layouts/DefaultLayaout'

import { History } from './pages/History'
import { Home } from './pages/Home'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayaout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
