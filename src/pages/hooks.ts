import { useRouteMatch, useLocation } from 'react-router-dom'

export function useActiveTab(defaultKey: string) {
  const orderActive = useRouteMatch('/order')
  const userActive = useRouteMatch('/user')
  const chartActive = useRouteMatch('/charts')
  if (orderActive && orderActive.isExact) {
    return 'order'
  } else if (userActive && userActive.isExact) {
    return 'user'
  } else if (chartActive && chartActive.isExact) {
    return 'charts'
  } else {
    return defaultKey
  }
}
