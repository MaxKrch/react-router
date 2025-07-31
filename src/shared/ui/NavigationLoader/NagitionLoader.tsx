import Spinner from '@/shared/ui/Spinner'
import type { PropsWithChildren } from 'react'
import { useNavigation } from 'react-router-dom'

const NavigationLoader = ({ children }: PropsWithChildren) => {
  const navigation = useNavigation()

  return navigation.state === 'loading' ? <Spinner /> : <>{children}</>
}

export default NavigationLoader
