export const validateIdParam = (id) =>
  id != undefined || id != null || parseInt(id);

export const formatLabelAndProjectObjects = (data) =>
  data.forEach((o) => {
    o.taskLabels = o.taskLabels.map((tl) => ({
      id: tl.label.id,
      name: tl.label.name,
    }));
  });
