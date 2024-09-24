import {FC, ReactNode, createContext, useContext, useState} from 'react'
import { PrivLevel } from './AuthContext'

type Participant = {
    id: string,
    firstName: string,
    lastName: string,
    services: Service[]
    location: number,
    privileges: Partial<PrivLevel>
}

type GroupProvider = {
    service?: Service
    videoId?: string
    name: string,
    participants: Participant
}

export const groupContext = createContext<GroupProvider>({
    name: "",
    participants: []
})

export const GroupProvider: FC<{children: ReactNode, className?: string}> = ({children, className}) => {
	const {
        service,
        videoId,
        name,
        participants,
    } = useContext(groupContext)
    return <groupContext.Provider value={{ service, name, participants, videoId}} >
        {children}
    </groupContext.Provider>
}
