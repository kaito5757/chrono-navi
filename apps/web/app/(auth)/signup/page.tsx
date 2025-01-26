import { signup } from "./action";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            formAction={signup}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
