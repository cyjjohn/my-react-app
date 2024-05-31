import { IProduct } from '@/types/product.type'
import { ProColumns } from '@ant-design/pro-components'
import { Button, Popconfirm, Image } from 'antd'
import styles from './index.module.less'

interface IProps {
  listHandler: (id: string, status: string) => void
  editHandler: (id: string) => void
  cardHandler: (id: string) => void
  delHandler: (id: string) => void
}

const PRODUCT_STATUS = {
  LIST: 'LIST', //上架
  UN_LIST: 'UN_LIST', //下架
}

export const getColumns: ({
  listHandler,
  editHandler,
  cardHandler,
  delHandler,
}: IProps) => ProColumns<IProduct>[] = ({ listHandler, editHandler, cardHandler, delHandler }) => [
  {
    title: '#',
    dataIndex: 'index',
    valueType: 'indexBorder',
    align: 'center',
    width: 48,
  },
  {
    title: '封面',
    dataIndex: 'coverUrl',
    search: false,
    width: 100,
    ellipsis: true,
    render: (_d, e) => (
      <Image src={e.coverUrl} alt={e.coverUrl} height={40} className={styles.cover} />
    ),
  },
  {
    title: '商品名',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '原价（元）',
    dataIndex: 'originalPrice',
    search: false,
    width: 90,
  },
  {
    title: '库存总额',
    dataIndex: 'stock',
    search: false,
    width: 90,
  },
  {
    title: '当前库存',
    dataIndex: 'curStock',
    search: false,
    width: 90,
  },
  {
    title: '每人限购',
    dataIndex: 'limitBuyNumber',
    search: false,
    width: 80,
  },
  {
    title: '销量',
    dataIndex: 'sellNumber',
    search: false,
    width: 70,
  },
  {
    title: '优惠价（元）',
    dataIndex: 'preferentialPrice',
    search: false,
    width: 100,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    align: 'center',
    render: (_text, record) => [
      record.status === PRODUCT_STATUS.UN_LIST ? (
        <Button key="list" type="link" onClick={() => listHandler(record.id, PRODUCT_STATUS.LIST)}>
          上架
        </Button>
      ) : (
        <Button
          key="unlist"
          type="link"
          style={{ color: 'green' }}
          onClick={() => listHandler(record.id, PRODUCT_STATUS.UN_LIST)}
        >
          下架
        </Button>
      ),
      <Button key="card" type="link" onClick={() => cardHandler(record.id)}>
        绑消费卡
      </Button>,
      <Button key="edit" type="link" onClick={() => editHandler(record.id)}>
        编辑
      </Button>,
      <Popconfirm key="del" title="确认删除" onConfirm={() => delHandler(record.id)}>
        <Button type="link">删除</Button>
      </Popconfirm>,
    ],
  },
]
