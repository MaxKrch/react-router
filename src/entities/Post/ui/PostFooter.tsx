import PrimaryButton from "@/shared/ui/buttons/PrimaryButton"
import SecondButton from "@/shared/ui/buttons/SecondButton"
import { memo } from "react"

type PostFooterProps = {
    saved: boolean,
    onEdit: () => void,
    onRemove: () => void
}

const PostFooter = ({ saved, onEdit, onRemove }: PostFooterProps) => {
    if(!saved) {
        return(
            <footer className="h-6 flex font-semibold italic items-center px-4 animate-pulse bg-blue-200">
                <p>
                    Отправка...
                </p>
            </footer>
        )
    
    } else {
        return(
            <footer className="h-8 flex justify-end gap-2 items-center p-2">
                <PrimaryButton
                    title="Редактировать"
                    onClick={onEdit}
                />
                <SecondButton 
                    title="Удалить"
                    onClick={onRemove}
                />
            </footer>
        )
    }
}

export default memo(PostFooter)