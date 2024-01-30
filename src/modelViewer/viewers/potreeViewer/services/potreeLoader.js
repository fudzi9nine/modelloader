import { Loader, Euler } from 'three'
import { Potree, PointSizeType } from 'potree-core'


const potree = new Potree()

class PotreeLoader extends Loader {
  load(dataUrl, onLoad) {
    const { origin, pathname } = new URL(dataUrl)
    const base = origin + pathname.slice(0, pathname.lastIndexOf('/'))
    const rootFile = pathname.split('/').pop()
    const token = dataUrl.slice((origin + pathname).length)


    return (() => {
          console.log('start')
          console.log('rootFile', rootFile)
          potree.pointBudget = 20_000_000
          potree.maxNumNodesLoading = 1

          return potree.loadPointCloud(rootFile, (file) => {
            console.log('file', file)
            console.log('full link: ', `${base}/${file}${token}`)
            return `${base}/${file}${token}`})
        })()
      .then((pco) => {
      console.log('mid')
      const offset = pco.position.clone()

        // eslint-disable-next-line no-param-reassign
        pco.pointSizeType = PointSizeType.FIXED
        pco.position.set(0, 0, 0)
        pco.setRotationFromEuler(new Euler(-Math.PI / 2, 0, 0))
        pco.translateX(offset.x)
        pco.translateY(offset.y)
        pco.translateZ(offset.z)
        console.log('loaded &')
        onLoad(pco)
      })
      .catch((e) => {console.log('here error: ', e)})
  }
}

export default PotreeLoader
