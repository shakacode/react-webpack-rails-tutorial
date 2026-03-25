export default function actionCableUrl() {
  const cableMetaTag = document.querySelector("meta[name='action-cable-url']");
  return cableMetaTag ? cableMetaTag.getAttribute('content') : undefined;
}
