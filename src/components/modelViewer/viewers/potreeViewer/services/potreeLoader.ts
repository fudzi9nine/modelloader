import {Potree, PointSizeType, type PointCloudOctree} from 'potree-core';
import {Loader, Euler} from 'three';

const potree = new Potree();

class PotreeLoader extends Loader {
  async load(
    dataUrl: string,
    onLoad: (pointCloud: PointCloudOctree) => void,
    onProgress: () => void,
    onError: () => void
  ): Promise<void> {
    const {origin, pathname} = new URL(dataUrl);
    const base = origin + pathname.slice(0, pathname.lastIndexOf('/'));
    const rootFile = pathname.split('/').pop();
    const token = dataUrl.slice((origin + pathname).length);

    if (rootFile == null) {
      onError();
      return;
    }

    await (async () => {
      potree.pointBudget = 20_000_000;
      potree.maxNumNodesLoading = 1;

      return await potree.loadPointCloud(rootFile, file => {
        return `${base}/${file}${token}`;
      });
    })()
      .then(pco => {
        const offset = pco.position.clone();

        pco.pointSizeType = PointSizeType.FIXED;
        pco.position.set(0, 0, 0);
        pco.setRotationFromEuler(new Euler(-Math.PI / 2, 0, 0));
        pco.translateX(offset.x);
        pco.translateY(offset.y);
        pco.translateZ(offset.z);
        onLoad(pco);
      })
      .catch(e => {
        onError();
      });
  }
}

export default PotreeLoader;
