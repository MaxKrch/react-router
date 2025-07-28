import Spinner from "@/shared/ui/Spinner"
import { useNavigation } from "react-router-dom"

const AwaitNavigation = () => {
    const navigation = useNavigation()

    if(navigation.state === 'loading') {
        return <Spinner />
    }

    return null;
}

export default AwaitNavigation;