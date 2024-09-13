export const defaultBranchData = {
  id: null,
  name: '',
  address: '',
  phone: '',
  email: '',
  assets: 0,
  companyId: null
}

export function createBranch(data = {}) {
  return { ...defaultBranchData, ...data }
}
