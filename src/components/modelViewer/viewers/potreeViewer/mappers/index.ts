export const potreeAssetsMapper = (assetList: string[], dataUrl: string): string[] => {
  const {origin, pathname} = new URL(dataUrl);
  const token = dataUrl.slice((origin + pathname).length);

  return assetList.map(asset => {
    const assetUrl = new URL(asset);
    return `${origin}${assetUrl.pathname}${token}`;
  });
};
