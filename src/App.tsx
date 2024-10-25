import { useState } from 'react'
import './App.css'

interface UserType {
  avatar_url: string;
  login: string;
  location: string;
  followers: number;
  following: number;
}

function App() {
  const [userName, setUserName] = useState("")
  const [user, setUser] = useState<UserType | null>(null);
  const [error, setError] = useState('')

  const loadUser = async (userName: string) => {
    try {
      setError('') // Limpa o erro antes de cada nova busca
      const res = await fetch(`https://api.github.com/users/${userName}`)
      
      if (!res.ok) {
        throw new Error("Usuário não encontrado!") // Lança erro se o status não for 2xx
      }

      const data = await res.json()
      const { avatar_url, login, location, followers, following } = data

      const userData: UserType = {
        avatar_url,
        login,
        location,
        followers,
        following,
      };

      setUser(userData)
    } catch (err: any) {
      setUser(null) // Reseta o usuário
      setError(err.message || "Ocorreu um erro ao buscar o usuário.")
    }
  }

  return (
    <section>
      <h1>Github Finder</h1>

      <div className='pesquisa'>
        <h2>Busque por um usuário</h2>
        <input 
          placeholder='Nome do usuário' 
          type="text" 
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={() => loadUser(userName)}>Enviar</button>
      </div>


      {error && (
        <div className='response' >
            <p className='error'>{error}</p>
        </div>
      )}

      {user && (
        <div className='response'>
          <img src={user.avatar_url} alt={user.login} />
          <h1>{user.login}</h1>
          <p>{user.location}</p>
          <div className='follows'>
            <div>
              <p>Seguidores</p>
              <span>{user.followers}</span>
            </div>
            <div>
              <p>Seguindo</p>
              <span>{user.following}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default App
