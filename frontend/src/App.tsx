import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {trpc} from "#frontend/src/trpc.tsx";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

function App() {
  const userQuery = trpc.getUser.useQuery("1")
  const createUserMutation = trpc.createUser.useMutation();
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo"/>
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo"/>
        </a>
      </div>
      <h1>Vite + React = { userQuery.isPending ? "..." : `{ id: "${userQuery.data?.id}", name: "${userQuery.data?.name}" }`}</h1>
      <div className="card">
        <button onClick={() => createUserMutation.mutate({name: 'Bilbo'})} disabled={createUserMutation.isPending}>
          Create Bilbo
        </button>
        <p>
          {createUserMutation.isError ? createUserMutation.error.message : null}
        </p>
      </div>
      <ReactQueryDevtools/>
    </>
  )
}

export default App
