export default function getAllPageIds(
  collectionQuery,
  collectionId,
  collectionView,
  viewIds
) {
  if (!collectionQuery && !collectionView) {
    return [];
  }

  let pageIds = [];
  try {
    if (viewIds && viewIds.length > 0) {
      const ids =
        collectionQuery[collectionId][viewIds[0]]?.collection_group_results
          ?.blockIds;
      for (const id of ids) {
        pageIds.push(id);
      }
    }
  } catch (error) {}

  if (
    pageIds.length === 0 &&
    collectionQuery &&
    Object.values(collectionQuery).length > 0
  ) {
    const pageSet = new Set();
    Object.values(collectionQuery[collectionId]).forEach((view) => {
      view?.blockIds?.forEach((id) => pageSet.add(id));
      view?.collection_group_results?.blockIds?.forEach((id) =>
        pageSet.add(id)
      );
    });
    pageIds = [...pageSet];
  }
  return pageIds;
}
