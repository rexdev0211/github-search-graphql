import React from 'react'
import AppHeader from './AppHeader'
import Context from './components/Context/Context'
import SearchInput from './components/Search/SearchInput'
import SearchContainer from './components/SearchResult/SearchContainer'
import UseGitHubApi from './hook/UseGitHubApi'

const App = () => {
  const { result, handleRequest, request } = UseGitHubApi()

  return (
    <div className="mx-1 ">
      <AppHeader />
      <SearchInput handleRequest={handleRequest} />
      <Context.Provider value={{ result: result, request: request }}>
        <SearchContainer handleRequest={handleRequest} />
      </Context.Provider>
    </div>
  )
}

export default App
