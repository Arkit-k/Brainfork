import { ModeToggle } from '@/components/button.toggler'
import { SidebarProvider } from '@/components/ui/sidebar'
import { SidebarDemo } from './app.sidebar'
import { ThemeProvider } from "@/components/theme-provider"
import { SignOutButton } from '@/components/sign-out'

type Props = {
      children:React.ReactNode
}

const SidebarLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <SidebarDemo />
      <main className='w-full m-2'>
            <div className='flex item-center gap-2 border-sidebar-border bg-sidebar border shadow rounded-md p-2 px-4'>
                  {/* <Searchbar/> */}
                  <div className='ml-auto'>
                  </div>
                  <ModeToggle />
                  <SignOutButton />
            </div>
            <div className='h-4'>
                  <div className='border-sidebar-border bg-sidebar border shadow rounded-md overflow-y-scroll h-[calc(100vh-6rem)] p-4'>
                        {children}
                  </div>
            </div>

      </main>
      </SidebarProvider>
  )
}

export default SidebarLayout