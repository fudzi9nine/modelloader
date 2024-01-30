import {type LoaderProto, useLoader} from '@react-three/fiber';
import {type PointCloudOctree} from 'potree-core';
import {useEffect} from 'react';

export default function useCacheCleanup(loader: LoaderProto<PointCloudOctree>, url: string): void {
  useEffect(() => {
    return () => {
      useLoader.clear(loader, url);
    };
  }, [loader, url]);
}
