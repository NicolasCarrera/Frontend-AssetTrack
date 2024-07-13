import assetImage from '../../assets/img/asset-svg.svg'

export default function AssetCard({ asset, handleclick }) {
  return (
    <article
      className='bg-gray-200 px-8 py-6 rounded-md shadow-lg hover:bg-gray-300 hover:cursor-pointer'
      onClick={handleclick}
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
          <strong>Categoría</strong>
          <span>{asset.category}</span>
          <strong>Tipo</strong>
          <span>{asset.type}</span>
          <strong>Área</strong>
          <span>{asset.area}</span>
        </div>
        <div className='flex flex-col'>
          {
            asset.maintenance.last &&
            <>
              <strong>Ultimo mantenimiento</strong>
              <span>{asset.maintenance.last}</span>
            </>
          }
          {
            asset.maintenance.next &&
            <>
              <strong>Próximo mantenimiento</strong>
              <span>{asset.maintenance.next}</span>
            </>
          }
        </div>
      </section>
    </article>
  )
}