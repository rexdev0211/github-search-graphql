import React from 'react'
// external files
import { ImLocation2 } from 'react-icons/im'


const User = ({ user, handleRequest }) => {
  const {
    name,
    avatarUrl,
    location,
    login,
  } = user.node

  const onSelectUser = () => {
    handleRequest({
      key: 'getReposByUser',
      values: {
        query: `user:${login}`,
        first: 10,
        after: null,
      }
    })
  }

  return (
    <>
      <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/5  px-2 mb-4">
        <div className="shadow-xl drop-shadow-xl bg-white rounded-md h-30 pb-3    p-4 ">
          {/* Profile here first */}
          <div className="profile flex items-start  h-20  w-12/12 ">
            {/* Profile image */}
            <div>
              <img
                className="inline-block h-12 w-12 rounded-full object-cover ring-4 ring-gray-200 
          shadow-2xl"
                src={avatarUrl}
                alt={`${name || login}'s Profile`}
              />
            </div>
            {/* Profile image */}

            <div className="name flex leading-3 ml-4">
              <button onClick={onSelectUser}>
                <h2 className="text-xl truncate capitalize text-blue-500 leading-5 font-bold">
                  {name ? name : 'Null'}
                </h2>

                {/* Profile name */}
                <p className="text-base  text-gray-600 font-normal">
                  {login ? login : 'Null'}
                </p>
                <p className="flex items-center">
                  <span>
                    <ImLocation2 className=" mr-2  h-3 w-3" color="#3684CC" />
                  </span>
                  <span className="text-sm leading-5 text-gray-600 font-normal w-28  truncate ">
                    {location ? location : '?'}
                  </span>
                </p>
              </button>
            </div>
            {/* Profile name */}
          </div>

        </div>
      </div>
    </>
  )
}

export default User
