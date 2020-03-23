const Prizes = [
  {
    prizeId: 1,
    prizeKind: '优秀团支部评选',
    prizeName: '具体名称优秀团支部评选',
    prizeInfo: '优秀团支部评选规则简介',
    startDate: '2020-2-2',
    endDate: '2020-3-3'
  },
  {
    prizeId: 2,
    prizeKind: '优秀团支部评选',
    prizeName: '具体名称优秀团员评选',
    prizeInfo: '优秀团员评选规则简介',
    startDate: '2020-2-2',
    endDate: '2020-3-3'
  }
]
const myPrizes = [
  {
    reportId: 1,
    prizeKind: '优秀团支部大类',
    prizeName: 'league branch excellent awards',
    reportPhotos: [
      {
        url: 'http://139.224.135.165:8080/download/2.jpg'
      },
      {
        url: 'http://139.224.135.165:8080/download/3.jpg'
      }
    ],
    reportInfo: 'reportInfo specific introduction',
    annex: [
      { url: 'http://139.224.135.165:8080/download/demo.xlsx' },
      { url: 'http://139.224.135.165:8080/download/demo.xlsx' },
      { url: 'http://139.224.135.165:8080/download/demo.xlsx' }
    ]
  },
  {
    reportId: 2,
    prizeKind: '优秀团员大类',
    prizeName: 'member excellent awards',
    reportPhotos: [
      {
        url: 'http://139.224.135.165:8080/download/2.jpg'
      },
      {
        url: 'http://139.224.135.165:8080/download/3.jpg'
      }
    ],
    reportInfo: 'reportInfo specific introduction',
    annex: [
      { url: 'http://139.224.135.165:8080/download/demo.xlsx' },
      { url: 'http://139.224.135.165:8080/download/demo.xlsx' },
      { url: 'http://139.224.135.165:8080/download/demo.xlsx' }
    ]
  }
]
const mainCategory = [
  {
    id: 1,
    mainCategoryName: '团支部奖项'
  },
  {
    id: 2,
    mainCategoryName: '团员奖项'
  },
  {
    id: 3,
    mainCategoryName: '党员奖项'
  }
]
const specificCategory = [
  {
    id: 5,
    specificCategoryName: '优秀团支部'
  },
  {
    id: 6,
    specificCategoryName: '先进团支部'
  },
  {
    id: 7,
    specificCategoryName: '光荣团支部'
  }
]
const prizeDetails = [
  {
    prizeId: 1,
    prizeName: '优秀团员',
    selectRule: '本奖项包含四种类型评选规则，包含政治素质、工作业绩、业务能力与形象作风。',
    startDate: '2020-03-01',
    endDate: '2020-03-20',
    reportNum: 10,
    highNinety: 4
  },
  {
    prizeId: 2,
    prizeName: '优秀团员',
    selectRule: '本奖项包含四种类型评选规则，包含政治素质、工作业绩、业务能力与形象作风。',
    startDate: '2020-03-01',
    endDate: '2020-03-20',
    reportNum: 10,
    highNinety: 4
  },
  {
    prizeId: 3,
    prizeName: '优秀团员',
    selectRule: '本奖项包含四种类型评选规则，包含政治素质、工作业绩、业务能力与形象作风。',
    startDate: '2020-03-01',
    endDate: '2020-03-20',
    reportNum: 10,
    highNinety: 4
  },
  {
    prizeId: 4,
    prizeName: '优秀团员',
    selectRule: '本奖项包含四种类型评选规则，包含政治素质、工作业绩、业务能力与形象作风。',
    startDate: '2020-03-01',
    endDate: '2020-03-20',
    reportNum: 10,
    highNinety: 4
  }
]

export default [
  {
    url: '/api/allPrize',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          Prizes
        }
      }
    }
  },
  {
    url: '/api/mineAllPrize',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          myPrizes
        }
      }
    }
  },
  {
    url: '/api/main',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          mainCategory
        }
      }
    }
  },
  {
    url: '/api/spec',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          specificCategory
        }
      }
    }
  },
  {
    url: '/prize/info',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          specificCategory
        }
      }
    }
  },
  {
    url: '/api/upload',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: {
          url: 'http://139.224.135.165:8080/download/2.jpg'
        }
      }
    }
  },
  {
    url: '/api/updateReport',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/api/prizesDetail',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: prizeDetails
      }
    }
  }
]
