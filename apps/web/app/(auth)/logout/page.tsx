import { logout } from "./action";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default function page() {
  return (
    <>
      <form>
        <div className="flex gap-4">
          <button
            type="submit"
            formAction={logout}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Log out
          </button>
        </div>
      </form>
    </>
  );
}
