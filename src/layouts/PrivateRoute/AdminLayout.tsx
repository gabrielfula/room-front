import Sidebar from '@/components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <>
      <div className='flex flex-col text-sm'>
        <div className='flex flex-1'>
          <div className='w-60'>
            <Sidebar />
          </div>
          
          <div className='flex-1'>
            <div className='flex flex-col gap-4'>
              <div className='py-10 mx-10'>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
