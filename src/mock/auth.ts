export default [{
    url: '/api/login',
    method: 'post',
    rawResponse: async (req: any, res: any) => {
        res.setHeader('Content-Type', 'text/plain')
        res.setHeader('cookie', '1111')
        res.statusCode = 200
        res.end(`ok`)
    },
}, {
    url: '/api/register',
    method: 'post',
    rawResponse: async (req: any, res: any) => {
        res.setHeader('Content-Type', 'text/plain')
        res.setHeader('cookie', '1111')
        res.statusCode = 200
        res.end(`ok`)
    },
}]