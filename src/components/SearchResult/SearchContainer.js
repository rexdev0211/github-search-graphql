import React from 'react'
import Context from '../Context/Context'
import Error from '../DataStates/Error'
import Fetching from '../DataStates/Fetching'
import Repo from './Repo'
import User from './User'

const SearchContainer = ({ handleRequest }) => {
  const result = React.useContext(Context)
  const { result: searchResult, request } = result
  const { fetching, data, error } = searchResult
  if (fetching) return <Fetching />
  if (error) return <Error error={error} />

  console.log('data', data);

  return (
    <div className="flex flex-wrap my-8  font-light">
      {data !== undefined &&
        data.search.edges.map((data, index) =>
          <>
            {request.key === 'getUsers' && <User key={index} user={data} handleRequest={handleRequest} />}
            {request.key === 'getReposByUser' && <Repo key={index} repo={data} handleRequest={handleRequest} />}
          </>
        )
      }
    </div>

  )
}

export default SearchContainer
