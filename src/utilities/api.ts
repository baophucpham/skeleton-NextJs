export const injectVariablesToUrl = (
  url: string,
  variables: Record<string, any>
) => {
  const variablesEntries = Object.entries(variables);
  let newUrl = url;

  for (const [key, value] of variablesEntries) {
    newUrl = newUrl.replace(`:${key}`, value);
  }
  return newUrl;
};
