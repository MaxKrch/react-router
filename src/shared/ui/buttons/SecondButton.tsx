import { memo } from "react"
import type { ButtonProps } from "./types"

const SecondButton = ({
    title, 
    onClick,
    type = 'button',
    size = 'normal',
    disabled = false
}: ButtonProps) => {
    let fontSize: string;
    
    switch (size) {
        case 'small':
            fontSize = '9px';
            break;

        case 'big':
            fontSize = '15px'
            break;

        default:
            fontSize = '11px'        
    }

    return(
        <button
            className={`bg-white text-blue-800 border border-blue px-4 py-1 rounded cursor-pointer uppercase font-semibold text-[${fontSize}] hover:bg-gray-100`}
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

export default memo(SecondButton)