// src/routes/index.tsx
import { db } from '@/db'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Badge } from '@/components/ui/badge'

const serverLoader = createServerFn({ method: 'GET' }).handler(() => {
  return db.query.gameSlots.findMany()
})

export const Route = createFileRoute('/')({
  component: App,
  loader: () => {
    return serverLoader()
  },
})

function App() {
  const gameSlots = Route.useLoaderData()
  const totalCount = gameSlots.length
  const bookedCount = gameSlots.filter((slot) => slot.booked).length

  return <div className="min-h-screen space-y-8 container">
    <div className='flex justify-between items-center gap-4'>
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold'>Daily Game Plan</h1>
        {totalCount > 0 && (
          <Badge variant="outline">
            {bookedCount} booked
          </Badge>
        )}
      </div>
    </div>
    {JSON.stringify(gameSlots)}
  </div>
}
