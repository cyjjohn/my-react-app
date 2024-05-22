import { COMMIT_PRODUCT, DEL_PRODUCT, GET_PRODUCT, GET_PRODUCTS } from '@/graphql/product'
import { IProduct, TBaseProduct, TProductQuery, TProductsQuery } from '@/types/product.type'
import { DEFAULT_PAGE_SIZE } from '@/utils/constants'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { App } from 'antd'
import { useMemo } from 'react'

export const useProducts = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
  const { loading, data, refetch } = useQuery<TProductsQuery>(GET_PRODUCTS, {
    skip: true,
    variables: {
      page: {
        pageNum,
        pageSize,
      },
    },
  })
  const refetchHandler = async (params: { name?: string; pageSize?: number; current?: number }) => {
    const { data, errors } = await refetch({
      // 这里的参数格式是antd的规范
      name: params.name,
      page: {
        pageNum: params.current ?? 1,
        pageSize: params.pageSize ?? DEFAULT_PAGE_SIZE,
      },
    })
    if (errors) {
      return {
        sucesss: false,
      }
    }
    return { data: data?.getProducts.data, page: data?.getProducts.page, sucesss: true }
  }
  return {
    loading,
    data: data?.getProducts.data,
    page: data?.getProducts.page,
    refetch: refetchHandler,
  }
}

export const useProduct = () => {
  const [get, { loading }] = useLazyQuery(GET_PRODUCT)

  const getProduct = async (id: string): Promise<IProduct> => {
    const res = await get({
      variables: {
        id,
      },
    })
    return res.data?.getProductInfo.data as IProduct
  }

  return {
    loading,
    getProduct,
  }
}

export const useProductInfo = (id: string) => {
  const { data, loading, refetch } = useQuery<TProductQuery>(GET_PRODUCT, {
    variables: {
      id,
    },
  })
  //图片数据处理
  const newData = useMemo(
    () => ({
      ...data?.getProductInfo.data,
      coverUrl: [{ url: data?.getProductInfo.data.coverUrl }],
      bannerUrl: [{ url: data?.getProductInfo.data.bannerUrl }],
    }),
    [data],
  )
  return { data: data?.getProductInfo.data ? newData : undefined, loading, refetch }
}

export const useEditProduct = (): [
  handleEdit: (id: string, params: TBaseProduct, callback: (isReload: boolean) => void) => void,
  loading: boolean,
] => {
  const { message } = App.useApp()
  const [commit, { loading }] = useMutation(COMMIT_PRODUCT)
  const handleEdit = async (
    id: string,
    params: TBaseProduct,
    callback: (isReload: boolean) => void,
  ) => {
    const res = await commit({
      variables: {
        params,
        id,
      },
    })
    if (res.data.commitProductInfo.code === 200) {
      message.success(res.data.commitProductInfo.message)
      callback(true)
      return
    }
    message.error(res.data.commitProductInfo.message)
  }
  return [handleEdit, loading]
}

export const useDelProduct = (): [
  handleDel: (id: string, callback: () => void) => void,
  loading: boolean,
] => {
  const { message } = App.useApp()
  const [del, { loading }] = useMutation(DEL_PRODUCT)
  const handleDel = async (id: string, callback: () => void) => {
    const res = await del({
      variables: {
        id,
      },
    })
    if (res.data.deleteProduct.code === 200) {
      message.success(res.data.deleteProduct.message)
      callback()
      return
    }
    message.error(res.data.deleteProduct.message)
  }
  return [handleDel, loading]
}
