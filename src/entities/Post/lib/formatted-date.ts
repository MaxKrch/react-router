import dayjs from "dayjs"

const formatDate = (post: {
    created: number | Date | null,
    edited: number | Date | null
}) => {
    const date = post.edited || post.created
    const formattedDate = date
        ? dayjs (date).locale('ru').format('DD MMMM YYYY-HH:mm').split('-')
        : null

    return formattedDate
}

export default formatDate
