export const defaultCompanyData = {
  id: null,
  name: '',
  userId: null,
  status: ''
}

export function createCompany(data = {}) {
  return { ...defaultCompanyData, ...data }
}
