// const BASE_URL = 'http://localhost:3000/api/v1'
//通过环境变量来切换环境
const BASE_URL = 'https://service-r7jmw9d4-1313811129.gz.apigw.tencentcs.com/release/'
    // process.env.NODE_ENV === 'development'
    //     ? 'https://service-r7jmw9d4-1313811129.gz.apigw.tencentcs.com/release/'
    //     : 'https://service-r7jmw9d4-1313811129.gz.apigw.tencentcs.com/release/'

const TIME_OUT = 5000

export { BASE_URL, TIME_OUT }

// http://101.43.155.53:9001/