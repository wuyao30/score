const reportersInfo = [
  {
    id: 1,
    username: 'zhangsan',
    password: '123456',
    name: '张三',
    phone: '15651353050',
    company: '姚庄煤矿',
    department: '市场部',
    repStatus: 0
  },
  {
    id: 2,
    username: 'zhangsan',
    password: '123456',
    name: '李四',
    phone: '15651353050',
    company: '姚庄煤矿',
    department: '市场部',
    repStatus: 0
  },
  {
    id: 3,
    username: 'zhangsan',
    password: '123456',
    name: '王五',
    phone: '15651353050',
    company: '姚庄煤矿',
    department: '市场部',
    repStatus: 0
  },
  {
    id: 4,
    username: 'zhangsan',
    password: '123456',
    name: '张三三',
    phone: '15651353050',
    company: '姚庄煤矿',
    department: '市场部',
    repStatus: 0
  },
  {
    id: 5,
    username: 'zhangsan',
    password: '123456',
    name: '张三十',
    phone: '15651353050',
    company: '姚庄煤矿',
    department: '市场部',
    repStatus: 0
  },
  {
    id: 6,
    username: 'zhangsan',
    password: '123456',
    name: '张三',
    phone: '15651353050',
    company: '姚庄煤矿',
    department: '市场部',
    repStatus: 0
  },
  {
    id: 7,
    username: 'zhangsan',
    password: '123456',
    name: '李四',
    phone: '15651353050',
    company: '姚庄煤矿',
    department: '市场部',
    repStatus: 0
  },
  {
    id: 8,
    username: 'zhangsan',
    password: '123456',
    name: '王五',
    phone: '15651353050',
    company: '姚庄煤矿',
    department: '市场部',
    repStatus: 0
  },
  {
    id: 9,
    username: 'zhangsan',
    password: '123456',
    name: '张三三',
    phone: '15651353050',
    company: '姚庄煤矿',
    department: '市场部',
    repStatus: 0
  },
  {
    id: 10,
    username: 'zhangsan',
    password: '123456',
    name: '张三十',
    phone: '15651353050',
    company: '姚庄煤矿',
    department: '市场部',
    repStatus: 0
  }
]

export default [
  {
    url: '/reporter/info',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          reportersInfo,
          total: 10,
          limit: 10
        }
      }
    }
  }
]
