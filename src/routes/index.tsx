// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/')({
  component: App
})

function App() {

  return <h1>Welcome to the DGP App</h1>
}