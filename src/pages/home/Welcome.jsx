import technical from '../../assets/img/technical.svg'

export default function Welcome() {
  return (
    <div className='flex flex-col md:flex-row gap-10 h-[600px] items-center justify-center md:justify-between'>
      <div className='flex flex-col gap-10 w-full max-w-md text-center md:text-left'>
        <h1 className='flex flex-col gap-4 text-5xl font-extrabold tracking-tight'>
          <span className='block'>Bienvenido a</span>
          <span className='block text-[#E53170]'>Asset Track</span>
        </h1>
        <p className='text-xl'>
          La plataforma integral que te permite gestionar y optimizar todos tus activos de manera eficiente y sin complicaciones.
        </p>
      </div>
      <img
        className='h-[600px] xl:mr-60'
        src={technical}
        alt='Imagen de vectorizada de un técnico con una laptop.'
      />
    </div>
  )
}