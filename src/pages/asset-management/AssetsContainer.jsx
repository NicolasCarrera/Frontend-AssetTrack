import { useNavigate } from "react-router-dom"
import AssetCard from "./AssetCard"

export default function AssetsContainer() {
  const assetList = [
    { id: 1, name: 'Activo 1', category: 'Categoria A', type: 'Tipo A', area: 'Area A', maintenance: { last: '12/07/2024', next: '12/07/2024' } },
    { id: 2, name: 'Activo 1', category: 'Categoria A', type: 'Tipo A', area: 'Area A', maintenance: { last: '12/07/2024', next: '12/07/2024' } },
    { id: 3, name: 'Activo 1', category: 'Categoria A', type: 'Tipo A', area: 'Area A', maintenance: { last: '12/07/2024', next: '12/07/2024' } },
    { id: 4, name: 'Activo 1', category: 'Categoria A', type: 'Tipo A', area: 'Area A', maintenance: { last: '12/07/2024', next: '12/07/2024' } },
    { id: 5, name: 'Activo 1', category: 'Categoria A', type: 'Tipo A', area: 'Area A', maintenance: { last: '12/07/2024', next: '12/07/2024' } },
    { id: 6, name: 'Activo 1', category: 'Categoria A', type: 'Tipo A', area: 'Area A', maintenance: { last: '12/07/2024', next: '12/07/2024' } },
    { id: 7, name: 'Activo 1', category: 'Categoria A', type: 'Tipo A', area: 'Area A', maintenance: { last: '12/07/2024', next: '12/07/2024' } },
  ]
  const navigate = useNavigate()
  return (
    <div className='grid grid-cols-3 gap-4'>
      {
        assetList.map(asset => (
          <AssetCard
            key={asset.id}
            asset={asset}
            handleclick={() => { navigate(`/customer/1/branch/1/asset/${asset.id}`) }}
          />
        ))
      }
    </div>
  )
}