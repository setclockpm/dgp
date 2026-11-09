// src/routes/index.tsx
import { db } from '@/db'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Badge } from '@/components/ui/badge'
import { Button } from '#/components/ui/button'
import { EditIcon, ListTodoIcon, PlusIcon, Trash2Icon } from 'lucide-react'

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
  const bookedCount = gameSlots.filter((slot) => slot.gameStatusId == 1 || 
                                                 slot.gameStatusId == 2 || 
                                                 slot.gameStatusId == 3 || 
                                                 slot.gameStatusId == 5 || 
                                                 slot.gameStatusId == 6).length

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
      <div>
        <Button size="sm" asChild>
          <Link to="/gameSlots/new">
            <PlusIcon /> Add Game Slot
          </Link>
      </Button>
      </div>
    </div>

    {JSON.stringify(gameSlots)}
  </div>
}
