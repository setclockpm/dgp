import { useRef, useState } from 'react';
import TimeInputWithIcon from './ui/time-input-with-icon'

import { Button } from './ui/button';
import { LoadingSwap } from './ui/loading-swap';
import { PlusIcon } from 'lucide-react';
import { createServerFn, useServerFn } from '@tanstack/react-start';
import { gameSlots } from '#/db/schema';
import { db } from "@/db";
import { redirect } from '@tanstack/react-router';
import type { SubmitEventHandler } from 'react';
import { z } from "zod";
import { DatePickerWithIcon } from './ui/date-picker-with-icon';


const addGameSlot = createServerFn({ method: 'POST' }).inputValidator(z.object({ scheduledTime: z.iso.datetime()})).handler(async({ data }) => {
    await db.insert(gameSlots).values({
        scheduledTime: new Date(data.scheduledTime),
    })
    throw redirect({ to: '/' })
} );


export function GameSlotForm() {
    const timeRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const addGameSlotFn = useServerFn(addGameSlot)


    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const gameScheduledTime = timeRef.current?.value;
        const inputtedDate = dateRef.current?.value;
        
        if (inputtedDate) {
            const dateObj = new Date(inputtedDate)
            console.log('Formatted date selected:', inputtedDate)
            console.log('Date selected to iso:', dateObj.toString())
        }
        console.log('gameScheduledTime', gameScheduledTime)

        if (!gameScheduledTime) return;

        setIsLoading(true)
        await addGameSlotFn({ data: { scheduledTime: new Date(gameScheduledTime).toLocaleString('en-US') } })
        setIsLoading(false)
    }


    return <form onSubmit={handleSubmit} className='flex gap-2 flex-wrap' action="">
        <div className='basis-full pb-8 pt-4'>
            <DatePickerWithIcon ref={dateRef} label='Daily Game Plan Date'/>
        </div>
        <TimeInputWithIcon ref={timeRef} label="Game Start Time for Slot" />
        <div className='flex flex-col gap-2 justify-end'>
            <Button type="submit" disabled={isLoading}>
                <LoadingSwap isLoading={isLoading} className='flex gap-2 items-center'>
                    <PlusIcon /> Create Game Slot
                </LoadingSwap>
            </Button>
        </div>
        
    </form>
}
