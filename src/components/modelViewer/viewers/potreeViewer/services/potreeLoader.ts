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
      return; // todo
    }

    await (async () => {
      potree.pointBudget = 20_000_000;
      potree.maxNumNodesLoading = 1;

      return await potree.loadPointCloud(rootFile, file => {
        console.log('file', file);
        console.log('full link: ', `${base}/${file}${token}`);
        return `${base}/${file}${token}`;
      });
    })()
      .then(pco => {
        const offset = pco.position.clone();

        // eslint-disable-next-line no-param-reassign
        pco.pointSizeType = PointSizeType.FIXED;
        pco.position.set(0, 0, 0);
        pco.setRotationFromEuler(new Euler(-Math.PI / 2, 0, 0));
        pco.translateX(offset.x);
        pco.translateY(offset.y);
        pco.translateZ(offset.z);
        console.log('loaded &');
        onLoad(pco);
      })
      .catch(e => {
        onError();
      });
  }
}

export default PotreeLoader;
