import fs from 'fs'
import path from 'path'
import multiparty from 'multiparty'

export default [{
    url: '/api/file',
    method: 'get',
    rawResponse: (req: any, res: any) => {
        const params = new URLSearchParams(req._parsedUrl.query);
        const fileId = params.get('id')
        let fileData = null
        if (fileId) {
            try {
                fileData = fs.readFileSync(path.join(__dirname, '../upload/' + fileId))
            } catch {
                fileData = null
            }
        }
        if (!fileData) {
            fileData = fs.readFileSync(path.join(__dirname, '../assets/images/coffee.png'))
        }
        res.setHeader('Content-Type', 'image/jpeg')
        res.statusCode = 200
        res.end(fileData)
    },
    statusCode: 200
}, {
    url: '/api/file',
    method: 'post',
    rawResponse: async (req: any, res: any) => {
        const form = new multiparty.Form({
            uploadDir: path.join(__dirname, '../upload/')
        })
        const { thumb }: any = await new Promise((resolve) => {
            form.parse(req, (err, fields, files) => {
                resolve(files)
            })
        })
        const fileInfo = thumb[0]
        const { base } = path.parse(fileInfo.path)
        res.end(base)
    },
    statusCode: 200
}]
