export const defaultCompanyData = {
  id: null,
  name: '',
  address: '',
  phone: '',
  email: '',
  industry: '',
  employees: 0,
  assets: 0
}

export function createCompany(data = {}) {
  return { ...defaultCompanyData, ...data }
}
