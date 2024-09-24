import {FC} from 'react'
import {Button} from 'svz-toolkit'

export interface ApproveProps {
	action: {
		displayName: string,
		type: string,
		link?: string,
		time?: number,
		target?: string
	},
	approve: () => void,
	reject: () => void,
	reset: () => void
}

const ApprovePanel: FC<ApproveProps> = ({action, approve, reject, reset}) => {
	let content = `${action ? `User ${action.displayName}` : 'A guest'} would like to `;
	switch(action.type){
		case 'video':
			content += 'watch ' + action.link + '.'
			break;
		case 'seek':
			content += 'skip to ' + action.time + '.'
			break;
		case 'pause':
			content += 'pause playback.';
			break;
		case 'play':
			content += 'resume playback.';
			break;
		case 'kick':
			content += 'kick ' + action.target;
			break;
		case 'invite':
			content += action.target ? 'invite ' + action.target : 'create an invite link.';
			break;
		default:
			content = "An error has occurred in a party member's request."
			return <Button onClick={() => reset()}>Return to Main Panel</Button>
	}
	return (
		<div>
			<h2>{content}</h2>
			{!isError 
				? <div>
					<Button onClick={() => props.approve()} >Approve</Button>
					<Button onClick={() => props.reject()}>Deny</Button>
				</div>
				: <Button onClick={() => props.reset()}>Return to Main Panel</Button>
			}
		</div>
	)
}

export default ApprovePanel;