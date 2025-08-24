const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-black">
  <div className="flex items-center justify-center h-full black">
    {children}
  </div>
</div>

  );
};

export default AuthLayout;