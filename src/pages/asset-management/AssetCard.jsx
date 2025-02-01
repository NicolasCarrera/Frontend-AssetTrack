import assetImage from '../../assets/img/asset-svg.svg'
import { defaultAssetData } from '../../utils/objects/asset'

export default function AssetCard({ asset = defaultAssetData, onClick }) {
  return (
    <article
      className='bg-gray-200 px-8 py-6 rounded-md shadow-lg hover:bg-gray-300 hover:cursor-pointer'
      onClick={onClick}
    >
      <header className='flex gap-6 items-center mb-4'>
        <img
          className='bg-[#FFFFFE] size-20'
          src={assetImage}
          alt='Activo'
        />
        <strong className='text-xl'>
          {asset.name}
        </strong>
      </header>
      <section className='grid grid-cols-2'>
        <div className='flex flex-col'>
          <strong>Numero de serie</strong>
          <span>{asset.serial}</span>
          <strong>Marca</strong>
          <span>{asset.brand}</span>
          <strong>Modelo</strong>
          <span>{asset.model}</span>
        </div>
        <div className='flex flex-col'>
          <strong>Ultimo mantenimiento</strong>
          <span>
            {
              asset.maintenance?.last ? asset.maintenance.last : '--/--/----'
            }
          </span>
          <strong>Próximo mantenimiento</strong>
          <span>{
            asset.maintenance?.next ? asset.maintenance.next : '--/--/----'
          }
          </span>
        </div>
      </section>
    </article>
  )
}