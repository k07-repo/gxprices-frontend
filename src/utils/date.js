export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
    return date.toLocaleDateString(undefined, options)
}

export const currentDateFilename = () => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
    const date = (new Date()).toLocaleDateString(undefined, options)
    return date.replaceAll('/', '-')
}