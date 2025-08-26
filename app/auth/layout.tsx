// app/auth/sign-in/layout.tsx
export default function SignInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full relative">
      {/* Background image container */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/bg.jpg')]"
      >
      
      {/* Optional overlay for dark shade */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {children}
      </div>
      </div>
    </div>
  )
}