import {useContext, useEffect, useMemo, useRef} from 'react'
import { GroupContext } from '.'
import { videoContext } from './VideoContext'

type VideoActions = {
	play: () => void,
	pause: () => void,
	seek: (position: number) => void,
	check: () => {
		seek: number,
		status: 'play' | 'pause' | 'buffer' | 'null'
	}
}

export const useCurrentService: () => Service | null = () => {
	const service = useMemo<Service | null>(() => {
		if (typeof window === 'undefined'){
			return null
		}
		else {
			const service: {[S in Service]: String} = {
				"Amazon Prime Video": "",
				"Apple TV Plus": "",
				"Crackle": "",
				"DIRECTV Stream": "directv",
				"Discovery Plus": "",
				"Disney Plus": "",
				"ESPN Plus": "",
				"Fubo TV": "",
				"HBO Max": "",
				"Hulu": "",
				"Hulu Live TV": "",
				"IMDb TV": "",
				"Netflix": "netflix",
				"Paramount Plus": "",
				"Peacock": "",
				"Peacock Free": "",
				"Philo": "",
				"Pluto TV": "",
				"Roku Channel": "",
				"Showtime": "",
				"Sling TV": "",
				"Spectrum TV Choice": "",
				"Starz": "",
				"Tubi": "",
				"Vidgo": "",
				"Xumo": "",
				"YouTube TV": "",
				"Youtube": ""
				
			}
			const serve = Object.entries(service).find(([service, hostSnippet]) => hostSnippet 
			&& window.location.hostname.match(RegExp(`(www.|)${hostSnippet}${hostSnippet.includes('.') ? "" : "\\.(com|tv|org|net|gov"})`)))?.[0] as Service
			|| null

		}
	},[ typeof window.location !== undefined && window.location.pathname ])
	return service
}

const getVideo = new Proxy<VideoActions>({play: () => {}, pause: () => {}, seek: (number) => {}, check: () => ({seek: 0, status: "null"})}, {
	get: (t, p, r) => {
		switch(useCurrentService()){
			case 'Netflix':

			case "YouTube":
			case "YouTube TV":
				

		}
	}
})

export default Services