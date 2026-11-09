import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/gameSlots/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/gameSlots/new"!</div>
}
