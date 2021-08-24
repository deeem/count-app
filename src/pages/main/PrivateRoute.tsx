import { FullpageSpinner } from 'components/FullpageSpinner'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Route, RouteProps, useHistory, useLocation } from 'react-router-dom'
import { UserContex } from 'userContext'
import { firebase } from '../../firebase'

type Props = {
  children: React.ReactNode
} & RouteProps

export const PrivateRoute: React.FC<Props> = ({ children, ...rest }) => {
  const [user, loading] = useAuthState(firebase.auth())

  const location = useLocation<{ returnUri: string }>()
  const history = useHistory()

  return (
    <Route
      {...rest}
      render={() => {
        if (loading) return <FullpageSpinner />
        if (!user) {
          history.push('/login', { returnUri: location.pathname })
          return
        }

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
