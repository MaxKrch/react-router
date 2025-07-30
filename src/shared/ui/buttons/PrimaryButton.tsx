import { memo } from "react"
import type { ButtonProps } from "./types"

const PrimaryButton = ({
    title, 
    onClick,
    type = 'button', 
    size = 'normal',
    disabled = false,
}: ButtonProps) => {
    let fontSize: string;
    
    switch (size) {
        case 'small':
            fontSize = '10px';
            break;

        case 'big':
            fontSize = '16px'
            break;

        default:
            fontSize = '12px'        
    }
    
    let classes = `text-white px-4 py-1 rounded uppercase font-semibold text-[${fontSize}]`
    
    disabled
        ? classes += ` bg-blue-400`
        : classes += ` bg-blue-600 hover:bg-blue-800 cursor-pointer`

    return(
              <button
            className={classes}
            disabled={disabled}
            onClick={onClick}
            type={type}
        >
            {
                title
            }
        </button>
    )
}

export default memo(PrimaryButton)