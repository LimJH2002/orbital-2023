import Card from "./card";
import Table from "./table";

export default function Overlap(props) {
  return (
    <div className="min-h-full">
      <div className="bg-gray-900 pb-28">
        <header className="py-10">
          <div className="flex flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <div className="w-48 ml-auto">
              <button
                onClick={() => props.auth.signOut()}
                className="px-12 py-1 rounded-sm bg-gray-700 text-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          {/* Replace start */}
          <Card />
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <Table />
          </div>
          {/* /Replace end */}
        </div>
      </main>
    </div>
  );
}
