import Layout from "@/components/layout"
import { useContext } from "react"
import { AuthContext } from "@/Auth"

function App({ children }: { children: React.ReactNode }) {
  const { logged } = useContext(AuthContext)
  return (
    <>
      {logged ?
        <Layout>
          <div className="flex items-center justify-center w-full p-4">
            {children}
          </div>
        </Layout>
        :
        children
      }
    </>
  )
}

export default App
