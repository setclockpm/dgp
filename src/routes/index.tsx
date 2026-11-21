// src/routes/index.tsx
import { db } from '@/db'
import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Badge } from '@/components/ui/badge'
import { Button } from '#/components/ui/button'
import { EditIcon, ListTodoIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '#/components/ui/empty'
// import type { GameSlot } from '#/types'

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
  const bookedGameSlots = gameSlots.filter((slot) => isBooked(slot.gameStatusId))
  const totalBookedCount = bookedGameSlots.length


  return <div className="min-h-screen space-y-8 container">
    <div className='flex justify-between items-center gap-4'>
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold'>Daily Game Plan</h1>
        {totalBookedCount > 0 && (
          <Badge variant="outline">
            {totalBookedCount} booked
          </Badge>
        )}
      </div>
      <div>
        <Button size='sm' asChild>
          <Link to='/gameSlots/new'> <PlusIcon />Add New Game Slot</Link>
        </Button>
      </div>
    </div>

    <GameSlotTable gameSlots={gameSlots}></GameSlotTable>
  </div>
}

function isBooked(gameStatus:number | null) {
  return gameStatus === 1 || gameStatus === 2 || gameStatus === 3 || gameStatus === 4 || gameStatus === 5
}

function GameSlotTable({ gameSlots }: { 
  gameSlots: Array<{
    id: string
    gameSlotStatusId: number | null
    gameStatusId: number | null
    gameGuideId: number | null
    gameId: number | null
    giveawayId: number | null
    numGuests: number| null
    textSent: boolean | null
    seApCall: boolean | null
    seApCallNotes: string | null
    gameNotes: string | null
    createdAt: Date | null
    scheduledTime: Date | null
    updatedAt: Date
  }>}) {

  // const bookedCount = gameSlots.filter((slot) => isBooked(slot.gameStatusId)).length

  if (gameSlots.length === 0) {
      return (
        <Empty className='border border-dashed'>
          <EmptyHeader>
            <EmptyMedia variant='icon'>
              <ListTodoIcon />
            </EmptyMedia>
            <EmptyTitle>No Game Slots Found</EmptyTitle>
            <EmptyDescription>Try adding a new game slot.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link to='/gameSlots/new'> <PlusIcon />Add New Game Slot</Link>
            </Button>
          </EmptyContent>
      </Empty>
      )
    }
      
  }

