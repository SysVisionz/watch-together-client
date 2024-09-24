import {FC, ReactNode, createContext, useContext, useEffect, useRef } from 'react'
// import type { ClientSessionOptions, SecureClientSessionOptions,  } from 'http2';
import {io, Socket} from 'socket.io-client'



/** in the future, this will be converted to HTTP/2 but right now it's a utilizing Websockets, not HTTP/2 streams. */
// type StreamActions = {
// 	send: <T = string | number | string[] | {[key: string]: string}>(value: T) => void;
// 	onResponse?: <T = string | number | (string | number)[] | {[key: string]: string | number}>(value: T) => void;
// 	onError?: (string: Error) => void
// 	onClose?: () => void;
// 	close: () => void;
// }

// type http2Context = {
// 	streams: {[key: string]: StreamActions}
// 	openStream: (id: string, options?: ClientSessionOptions | SecureClientSessionOptions | undefined) => Promise<void>;
// }

type WTSocket = Socket<ServerToClientEvents, ClientToServerEvents>

type SocketContext = {
	send: WTSocket["emit"];
	on: WTSocket["on"]
	off: WTSocket["offAny"]
	close: () => void;
}

type TableProps<T> = {
	data: T[],
	keyProp: keyof T,
	onEditClick: (item: T) => void
  }

export const socketContext = createContext<SocketContext>({
	send: ((a, v)=>{ }) as WTSocket["emit"],
	close: ()=>{},
	on: ((event, func) => {}) as WTSocket["on"],
	off: ((...args) => {}) as WTSocket["offAny"]
})

export const SocketProvider: FC<{children: ReactNode, className?: string}> = ({children, className}) => {
	const socket = useRef<WTSocket>()
	// const messages = useRef<() => 
	const connection = useRef<SocketContext>({
		send: ((a, v) => {}) as WTSocket["emit"],
		close: () => {},
		on: ((evt, func) => {}) as WTSocket["on"],
		off: ((...args) => {}) as WTSocket["offAny"]
	})
	
		// 90% I was way off track with this implementation.
		// const {readable, writable} = new TransformStream();

		// await fetch('/api/stream', {
		// 	method: "POST",
		// 	body: readable,
		// 	// @ts-ignore
		// 	duplex: 'half'
		// }).then((resp) => {
		// 	const reader = readable.getReader()
		// })
		// const writer = writable.getWriter()
		// streams.current![action] = {
		// 	send: (message) => writer.write(JSON.stringify({
		// 		action,
		// 		message
		// 	})),
		// 	close: writer.close
		// }
		
	// useEffect(() => {
	// 	console.log('sending boop')
	// 	openStream('boop').then(() => {
	// 		streams.current.boop.send('hello!')
	// 		console.log('boop sent')
	// 	})
	// }, [])
	useEffect(() => {
		socket.current = io();
		connection.current = {
			send: (...args) => socket.current!.emit(...args),
			close: () => socket.current?.close(),
			on: (evt: Parameters<WTSocket["on"]>[0], ...args) => {
				socket.current?.on(evt, ...args)
				return socket.current!
			},
			off: (...evts: Parameters<WTSocket["offAny"]>) => {
				socket.current?.offAny(...evts)
				return socket.current!
			}
		}
	}, [])
	return <socketContext.Provider value={{...connection.current}} >
        {children}
    </socketContext.Provider>
}

export const useSend: SocketContext["send"] = useContext(socketContext).send;
/** note that useOn will automatically add a destructor for the listener. This should be tested, though. */
export const useOn = (...[name, func]: Parameters<SocketContext["on"]>) => {
	const {on, off} = useContext(socketContext)
	useEffect(() => {
		on(name, func)
		return () => {
			off(name as any)
		}
	}, [])
}