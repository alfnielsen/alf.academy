import React, { FC, useEffect } from "react"
<<<<<<< HEAD

=======
>>>>>>> rewrite base. add php back
import useFunctions from "../redux-area/functions.redux"

const Home: FC = () => {
  const { functions, search } = useFunctions()
  useEffect(() => {
    search("")
  }, [search])
  return (
    <div>
      <h3>Functions</h3>
      <input onKeyUp={(t) => search(t.currentTarget.value)} />
      {functions.map((f) => (
        <div key={f.id}>{f.name}</div>
      ))}
    </div>
  )
}

export default Home
