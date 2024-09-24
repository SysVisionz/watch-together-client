declare type Service = "Netflix" | "Youtube" | "DIRECTV Stream" | "Hulu" | "Amazon Prime Video" | "Disney Plus" | "Apple TV Plus" | "HBO Max" | "Peacock" | "Discovery Plus" 
| "Paramount Plus" | "ESPN Plus" | "Starz" | "Showtime" | "Sling TV" | "Fubo TV" | "Philo" | "Hulu Live TV" | "YouTube TV" | "Vidgo" 
| "Spectrum TV Choice" | "Pluto TV" | "Tubi" | "Crackle" | "IMDb TV" | "Peacock Free" | "Roku Channel" | "Xumo"

declare interface ServerToClientEvents {
	confirmScan: (time: number) => true | number
}

declare interface ClientToServerEvents {
	sendScan: (time: number) => void
	check: () => void
}