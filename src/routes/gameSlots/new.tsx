import { GameSlotForm } from '@/components/game-slot-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'

export const Route = createFileRoute('/gameSlots/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="container space-y-2">
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="text-muted-foreground"
      >
        <Link to="/">
          <ArrowLeftIcon /> DGP Template
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Add New Game Slot</CardTitle>
          <CardDescription>
            Create a game slot for a specific time and game.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GameSlotForm />
        </CardContent>
      </Card>
    </div>
  )
}
