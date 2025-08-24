import { logout } from "@/actions/signout"; // adjust path

export function SignOutButton() {
  return (
    <form action={logout}>
      <button 
        type="submit"
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    </form>
  );
}