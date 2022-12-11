import * as uuid from 'uuid'

class File {
    save(file) {
        if (!file) return null
        const fileName = uuid.v4() + '.' + '.jpeg'
        return fileName
    }
}

export default new File()