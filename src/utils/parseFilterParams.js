const parseType = (unknownType) => {
  const isString = typeof unknownType === 'string';
  if (!isString) return;

  const isType = (unknownType) =>
    ['work', 'home', 'personal'].includes(unknownType);
  if (isType(unknownType)) return unknownType;
};

const parseFavourite = (unknownFavourite) => {
  if (['true', 'false'].includes(unknownFavourite)) {
    return unknownFavourite === 'true' ? true : false;
  }
  return;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;
  const parsedType = parseType(contactType);
  const parsedFavourite = parseFavourite(isFavourite);

  return {
    type: parsedType,
    favourite: parsedFavourite,
  };
};
