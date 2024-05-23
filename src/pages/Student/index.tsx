import { useStudents } from '@/services/student'
import { memo } from 'react'
import styles from './index.module.less'
import { PageContainer } from '@ant-design/pro-components'
import { Card, Pagination, Space } from 'antd'
import { IStudent } from '@/types/student.type'

const Student = memo(() => {
  const { loading, data, page, refetch } = useStudents()

  const onPageChangeHandler = (pageNum: number, pageSize: number) => {
    refetch({
      page: {
        pageNum,
        pageSize,
      },
    })
  }

  return (
    <div className={styles.container}>
      <PageContainer
        loading={loading}
        header={{
          title: '学员管理',
        }}
      >
        <Card>
          {data?.map((item: IStudent) => (
            <Card
              key={item.id}
              hoverable
              className={styles.card}
              cover={
                <div
                  className={styles.avatar}
                  style={{
                    backgroundImage: `url(${item.avatar || 'http://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/1675623073445.jpg'} )`,
                  }}
                />
              }
            >
              <Card.Meta
                title={item.name || '无名氏'}
                description={<Space>{[item.account || '无账号', item.tel || '无手机号']}</Space>}
              />
            </Card>
          ))}
          <div className={styles.page}>
            <Pagination
              pageSize={page?.pageSize}
              current={page?.pageNum}
              total={page?.total}
              onChange={onPageChangeHandler}
            />
          </div>
        </Card>
      </PageContainer>
    </div>
  )
})

export default Student
