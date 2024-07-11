import { useParams } from 'react-router-dom'

export default function ManageAsset() {
  let { customerId, branchId } = useParams()
  return (
    <div>{`ManageAsset C-${customerId}, B-${branchId}`}</div>
  )
}