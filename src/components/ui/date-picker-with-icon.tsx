import * as React from "react"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from './label'


export function DatePickerWithIcon(params: { ref: React.Ref<HTMLInputElement>, label?: string }) {
    const[open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [month, setMonth] = React.useState<Date | undefined>(date)
    const [value, setValue] = React.useState<string | undefined>(date?.toISOString())

    return (
        <div className='gap-2 flex w-full max-w-xs flex-col'>
            <Label htmlFor='timepicker' className='px-1'>
                {params.label || null}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        data-empty={!date}
                        className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                    >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        month={month}
                        onMonthChange={setMonth}
                        onSelect={(selectedDate) => {
                            setDate(selectedDate)
                            setOpen(false)
                            // setISOFormattedDate(selectedDate)
                            setValue(selectedDate?.toISOString())
                        }}
                    />
                    
                </PopoverContent>
            </Popover>
            <Input ref={params.ref} value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
    )
}
