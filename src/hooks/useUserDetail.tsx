import { useEffect, useState } from 'react'
import { getUserInfo } from '../service/api/reLoginApi/user'
import { UserDetailType } from '../type/userDetail'

export const useUserDetail = (id: string|undefined): [UserDetailType | undefined, boolean, boolean] => {
    const [userDetail, setUserDetail] = useState<UserDetailType>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(() => {
        setError(false)
        setLoading(true)

        getUserInfo(id)
            .then((res: UserDetailType) => {
                setUserDetail(res)
            })
            .catch((err) => {
                console.log(err)
                setError(true)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [id])
    return [userDetail, loading, error]
}