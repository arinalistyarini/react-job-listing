'use client'

import {
  LoginSocialGoogle
} from 'reactjs-social-login'
import { STORAGE_KEY } from '../constants'

export default function SocialLogin({ children, checkIsLoggedIn }: { children: any, checkIsLoggedIn: () => void }) {
  return (
    <div>
      <LoginSocialGoogle
        isOnlyGetToken
        client_id={process.env.NEXT_PUBLIC_REACT_APP_GG_APP_ID || ''}
        onResolve={({ provider, data }: any) => {
          const storageData = {
            provider,
            ...data
          }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData))
          checkIsLoggedIn()
        }}
      >
        { children }
      </LoginSocialGoogle>
    </div>
  )
}
