import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { PATH_DASHBOARD } from '../../routes/paths'

export default function Index() {
    const router = useRouter()

    useEffect(() => {
        if (router.pathname === PATH_DASHBOARD.root) {
            router.push(PATH_DASHBOARD.system.statistics)
        }
    })

    return null
}
