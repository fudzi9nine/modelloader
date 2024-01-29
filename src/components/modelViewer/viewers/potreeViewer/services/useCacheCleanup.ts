import { useEffect } from 'react'
import { LoaderProto, useLoader } from '@react-three/fiber'
import { PointCloudOctree } from 'potree-core'

export default function useCacheCleanup(loader: LoaderProto<PointCloudOctree>, url: string) {
  useEffect(() => {
    return () => {
      useLoader.clear(loader, url)
    }
  }, [loader, url])
}
