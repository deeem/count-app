import { useAuthState } from 'react-firebase-hooks/auth'

export type User = ReturnType<typeof useAuthState>[0]
