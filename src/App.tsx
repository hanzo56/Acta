import { Navigate, Route, Routes } from 'react-router-dom'
import { ConnectorsPage } from './pages/ConnectorsPage'
import { GraphMenuPage } from './pages/GraphMenuPage'
import { GraphPage } from './pages/GraphPage'
import { HomePage } from './pages/HomePage'
import { PreviewPage } from './pages/PreviewPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/preview" element={<PreviewPage />} />
      <Route path="/graph" element={<GraphPage />} />
      <Route path="/graph/menu" element={<GraphMenuPage />} />
      <Route path="/connectors" element={<ConnectorsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
