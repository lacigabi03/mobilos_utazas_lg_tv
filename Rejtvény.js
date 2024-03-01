import { WebView } from 'react-native-webview';

export default function Rejtveny(){
    return (
    <>
    <WebView 
        source={{ uri: 'https://www.netrejtveny.hu/' }} 
        style={{ marginBottom: 1, marginTop: 1 }} 
        />   
    </> 
    );
}


