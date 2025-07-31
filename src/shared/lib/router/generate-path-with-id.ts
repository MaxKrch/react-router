const generatePathWithId = (template: string, id: string | number) =>
  template.replace(':id', String(id))

export default generatePathWithId
