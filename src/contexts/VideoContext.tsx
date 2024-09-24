import {FC, ReactNode, createContext, useContext, useEffect, useRef} from 'react'
import SessionContext from './SessionContext'



type VideoProvider = {
    video?: HTMLVideoElement,
    API?: ServiceAPI
}

export const videoContext = createContext<VideoProvider>({

})

export const VideoProvider: FC<{children: ReactNode, className?: string}> = ({children, className}) => {
	const service 
    const actions = useRef()
    useEffect(() => {
        
    }, [service])
    return <videoContext.Provider value={{username, firstName, lastName, bio }} >
        {children}
    </videoContext.Provider>
}
