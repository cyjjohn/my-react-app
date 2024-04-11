import { COMMIT_ORG, DEL_ORG, GET_ORG, GET_ORGS } from '@/graphql/org'
import { TBaseOrganization, TOrgQuery, TOrgsQuery } from '@/types/org.type'
import { DEFAULT_PAGE_SIZE } from '@/utils/constants'
import { useMutation, useQuery } from '@apollo/client'
import { App } from 'antd'

export const useOrganizations = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
  const { loading, data, refetch } = useQuery<TOrgsQuery>(GET_ORGS, {
    variables: {
      page: {
        pageNum,
        pageSize,
      },
    },
  })
  return { loading, refetch, data: data?.getOrganizations.data, page: data?.getOrganizations.page }
}

export const useOrganization = (id: string) => {
  const { loading, data } = useQuery<TOrgQuery>(GET_ORG, {
    variables: {
      id,
    },
  })
  return {
    loading,
    data: data?.getOrganizationInfo.data,
  }
}

export const useEditOrg = (): [
  handleEdit: (params: TBaseOrganization, id: string) => void,
  loading: boolean,
] => {
  const { message } = App.useApp()
  const [commit, { loading }] = useMutation(COMMIT_ORG)
  const handleEdit = async (params: TBaseOrganization, id: string) => {
    const res = await commit({
      variables: {
        params,
        id,
      },
    })
    void message.info(res.data.commitOrganizationInfo.message)
  }
  return [handleEdit, loading]
}

export const useDelOrg = (): [
  handleDel: (id: string, callback: () => void) => void,
  loading: boolean,
] => {
  const { message } = App.useApp()
  const [del, { loading }] = useMutation(DEL_ORG)
  const handleDel = async (id: string, callback: () => void) => {
    const res = await del({
      variables: {
        id,
      },
    })
    if (res.data.deleteOrganization.code === 200) {
      message.success(res.data.deleteOrganization.message)
      callback()
      return
    }
    message.error(res.data.deleteOrganization.message)
  }
  return [handleDel, loading]
}
