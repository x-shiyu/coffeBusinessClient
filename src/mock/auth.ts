export default [{
    url: '/api/login',
    method: 'post',
    rawResponse: async (req: any, res: any) => {
        res.setHeader('Content-Type', 'text/plain')
        res.setHeader('Set-Cookie', ['user=ninja', 'language=javascript'])
        res.statusCode = 200
        res.end(`ok`)
    },
}, {
    url: '/api/register',
    method: 'post',
    rawResponse: async (req: any, res: any) => {
        res.setHeader('Content-Type', 'text/plain')
        res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
        res.statusCode = 200
        res.end(`ok`)
    },
}]