import * as React from "react"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from './label'

export function DatePickerWithIcon(params: { ref?: React.Ref<HTMLInputElement>, label?: string }) {
    const [date, setDate] = React.useState<Date>()

    return (
        <div className='gap-2 flex w-full max-w-xs flex-col'>
            <Label htmlFor='timepicker' className='px-1'>
                {params.label || null}
            </Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={"outline"} data-empty={!date} className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground">
                        {date ? format(date, "PPP") : <span>Pick a date</span>}<ChevronDownIcon data-icon="inline-end" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        defaultMonth={date}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
