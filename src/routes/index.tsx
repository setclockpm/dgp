// src/routes/index.tsx
import { db } from '@/db'
import { format } from "date-fns"
import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EditIcon, ListTodoIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '#/components/ui/empty'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from "@/components/ui/checkbox"

const serverLoader = createServerFn({ method: 'GET' }).handler(() => {
  return db.query.gameSlots.findMany()
})

export const Route = createFileRoute('/')({
  component: App,
  loader: () => {
    return serverLoader()
  },
  notFoundComponent: () => {
    return <p>This index page doesn't exist!</p>
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
        {gameSlots.length > 0 && (
          <Badge variant="outline">
            {totalBookedCount} booked
          </Badge>
        )}
      </div>
      <div>
        <Button variant="outline" size='sm' asChild>
          <Link to='/gameSlots/new'> <PlusIcon />Add New Game Slot</Link>
        </Button>
      </div>
    </div>

    <GameSlotTable gameSlots={gameSlots}></GameSlotTable>
  </div>
}

function isBooked(gameStatus:number | null) {
  return gameStatus === 6 || gameStatus === 2 || gameStatus === 3 || gameStatus === 4 || gameStatus === 5
}

function toLocalTimeString(date: Date | null) {
  if (!date) return ''
  const dateLocal = new Date(date);
  const newDate = new Date(
    dateLocal.getTime() + dateLocal.getTimezoneOffset() * 60 * 1000
  );
  return format(newDate, 'p')
}

function GameSlotTable({ gameSlots }: { 
  gameSlots: Array<{
    id: string
    gameSlotStatusId: number | null
    scheduledTime: Date | null
    gameId: number | null
    numGuests: number| null
    gameStatusId: number | null
    guestStatusId: number | null
    gameGuideId: number | null
    guestNotes: string | null
    shiftNotes: string | null
    giveawayId: number | null
    textSent: boolean | null
    seApCall: boolean | null
    seApCallNotes: string | null
    replays: number | null
    createdAt: Date | null
    updatedAt: Date
  }>}) {


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
      
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{String.fromCodePoint(0x1F551)}</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Game</TableHead>
            <TableHead># Guests</TableHead>
            <TableHead>Game Status</TableHead>
            <TableHead>Guest Status</TableHead>
            <TableHead>Game Guide</TableHead>
            <TableHead>Guest Notes</TableHead>
            <TableHead>Shift Notes</TableHead>
            <TableHead>Giveaway</TableHead>
            <TableHead>Text Sent?</TableHead>
            <TableHead>SE AP Call?</TableHead>
            <TableHead>SE AP Call Notes</TableHead>
            <TableHead >Replays</TableHead>
            <TableHead>$0.00</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gameSlots.map((slot) => (
            <TableRow key={slot.id}>
              <TableCell><Checkbox/></TableCell>
              <TableCell>{toLocalTimeString(slot.scheduledTime)}</TableCell>
              <TableCell>{slot.gameId}</TableCell>
              <TableCell>{slot.numGuests}</TableCell>
              <TableCell>{slot.gameStatusId}</TableCell>
              <TableCell>{slot.guestStatusId}</TableCell>
              <TableCell>{slot.gameGuideId}</TableCell>
              <TableCell>{slot.guestNotes}</TableCell>
              <TableCell>{slot.shiftNotes}</TableCell>
              <TableCell>{slot.giveawayId}</TableCell>
              <TableCell>{slot.seApCallNotes}</TableCell>
              <TableCell>{slot.textSent ? 'Yes' : 'No'}</TableCell>
              <TableCell>{slot.seApCall ? 'Yes' : 'No'}</TableCell>
              <TableCell>{slot.seApCallNotes}</TableCell>
              <TableCell>{slot.replays}</TableCell>
              <TableCell>$0.00</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
