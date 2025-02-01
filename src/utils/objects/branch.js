export const defaultBranchData = {
  id: null,
  name: '',
  location: '',
  phone: '',
  email: '',
  status: '',
  assets: 0,
  companyId: null
}

export function createBranch(data = {}) {
  return { ...defaultBranchData, ...data }
}
