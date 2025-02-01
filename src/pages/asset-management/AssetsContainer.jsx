import { useNavigate, useParams } from 'react-router-dom'
import AssetCard from './AssetCard'

export default function AssetsContainer({ assetData = [] }) {
  const navigate = useNavigate()
  const { customerId } = useParams()
  return (
    <div className='grid grid-cols-3 gap-4'>
      {
        assetData.length > 0 &&
        assetData.map(asset => (
          <AssetCard
            key={asset.id}
            asset={asset}
            onClick={() => { navigate(`/customers/${customerId}/branches/${asset.branchId}/asset/${asset.id}`) }}
          />
        ))
      }
    </div>
  )
}