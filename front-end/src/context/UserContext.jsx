import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();
const UserDispatchContext = createContext();

function UserProvider({ children }) {
  const [username, setUsername] = useState('');

  return (
    <UserContext.Provider value={ username }>
      <UserDispatchContext.Provider value={ setUsername }>
        { children }
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider, UserContext, UserDispatchContext };
