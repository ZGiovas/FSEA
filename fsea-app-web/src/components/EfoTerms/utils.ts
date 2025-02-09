export const transformAntDFiltersToAPI = (
  filters: Record<string, any>,
): Record<string, string | boolean> => {
  const transformedFilters: Record<string, string | boolean> = {};

  if (filters.is_obsolete)
    transformedFilters.is_obsolete = filters.is_obsolete[0];
  if (filters.has_children)
    transformedFilters.has_children = filters.has_children[0];
  if (filters.is_root) transformedFilters.is_root = filters.is_root[0];

  return transformedFilters;
};
