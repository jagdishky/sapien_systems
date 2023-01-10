import flashMessage from "../components/common/CustomFlashAlert";
import { BASE_MEDIA_URL } from "../graphql/Client";
import { Images } from "./imagePaths";

//PARSE ERROR MESSAGES
export function getErrorMessage(data: any) {

    interface dataMapProps {
        message: string
        extensions: any
    }

    data.map(({ message, extensions }: dataMapProps) => {
        if (extensions) {
            if (typeof extensions.data == 'object') {
                for (const [key, value] of Object.entries(extensions.data)) {
                    if (Array.isArray(value)) {
                        for (let i = 0; i < value.length; i++) {
                            if (typeof value[i] === 'object') {
                                for (const [key, value] of Object.entries(extensions.data)) {
                                    flashMessage(`${JSON.stringify(value)}`, 'danger')
                                    return (value)
                                }
                            }
                            else {
                                flashMessage(`${value[i]}`, 'danger')
                                return (value[i])
                            }
                        }
                    }
                    else {
                        flashMessage(`${JSON.stringify(value)}`, 'danger')
                        return (value)
                    }
                }
            }
            else {
                flashMessage(`${JSON.stringify(extensions.data)}`, 'danger')
                return (extensions.data)
            }
        }
        else if (message) {
            flashMessage(`${message}`, 'danger')
            return (message)
        }
        else {
            flashMessage(`Something went wrong`, 'danger')
            return (message)
        }
    }
    );
}


//get default image functions
export function getImage(url: string, defaultImage: string) {
    let path: string | undefined = defaultImage ? defaultImage : Images.IMG_APP_LOGO
    if (url == null || url == '') {
        return path
    } else {
        path = getImageUrl(url)
        return { uri: path }
    }
}

export function getImageUrl(url: string) {
    if (url) {
        const str = url
        const n = str.includes("http");
        if (n) {
            return url
        }
        else {
            return BASE_MEDIA_URL + '/' + url
        }
    }
}