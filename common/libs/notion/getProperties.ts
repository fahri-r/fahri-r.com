import { ExtendedRecordMap } from "notion-types";

interface PropertyProps {
  id: string;
  value: string;
}

interface getPropertiesProps {
  response: ExtendedRecordMap;
}

const getProperties = ({ response }: getPropertiesProps): PropertyProps[] => {
  const pageSchemas =
    response.collection[Object.keys(response.collection)[0]].value.schema;

  const properties: PropertyProps[] = [];

  Object.keys(pageSchemas).forEach((x) => {
    properties.push({
      id: x,
      value: pageSchemas[x].name,
    });
  });

  return properties;
};

export default getProperties;
