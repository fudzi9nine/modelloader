import { useEffect } from 'react'
import { useLoader } from '@react-three/fiber'

export default (loader, url) => {
  useEffect(() => {
    return () => {
      useLoader.clear(loader, url)
    }
  }, [loader, url])
}
