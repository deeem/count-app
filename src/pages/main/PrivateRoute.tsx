import { useAuthState } from 'react-firebase-hooks/auth'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { UserContex } from 'userContext'
import { firebase } from '../../firebase'

type Props = {
  children: React.ReactNode
} & RouteProps

export const PrivateRoute: React.FC<Props> = ({ children, ...rest }) => {
  const [user, loading] = useAuthState(firebase.auth())

  return (
    <Route
      {...rest}
      render={() => {
        if (loading) return null
        if (!user) return <Redirect to="/login" />

        return (
          <UserContex.Provider
            value={{
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            }}
          >
            {children}
          </UserContex.Provider>
        )
      }}
    />
  )
}
