import { showMessage } from 'react-native-flash-message';

//const FlashMessage = ({flashMsgRef})=> <FlashMessage position="top" ref={flashMsgRef}/>
const flashMessage = (message: string, type: any, description?: string) => showMessage({
    message: message,
    description: description,
    type: type,
    icon: type,
    position: "top",
});
export default flashMessage;