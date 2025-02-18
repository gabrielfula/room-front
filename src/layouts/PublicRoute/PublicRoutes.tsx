import { Link, Outlet } from 'react-router-dom'

export default function PublicRoutes() {
  return (
    <>
      <div className='flex flex-col gap-10 justify-center h-screen items-center'>
        <div className='w-1/3'>
          <Link to="/">
            <img src={"https://roomcompany.co/assets/frontnovo/img/logo/logo-dark.png"} alt="Logo" />
          </Link>
        </div>
        <div className='w-1/3'>
          <Outlet />
        </div>
      </div>
    </>
  )
}
