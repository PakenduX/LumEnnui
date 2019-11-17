import React from 'react'
import Header from "../components/Header"
import axios from 'axios'
import '../constants/serverAdress'
import {withSnackbar} from "../components/SnackBar"
import {
    Button,
    ImageBackground,
    Tile,
    Overlay,
    TextInput,
    Title,
    Subtitle,
    Text,
    Card,
    Caption,
    Image,
    View
} from "@shoutem/ui"
import luminy from '../assets/images/luminy.jpg'
import luminy2 from '../assets/images/luminy2.jpg'
import {KeyboardAvoidingView, ScrollView, Platform} from "react-native";
import { Provider, Portal, Modal} from "react-native-paper";
import moi from '../assets/images/moi.jpg'
import SplashScreen from 'react-native-splash-screen'
import { Container } from 'native-base'

class Welcome extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pseudo: '',
            visible: false
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    _showModal = () => this.setState({ visible: true });
    _hideModal = () => this.setState({ visible: false });

    function

    componentDidMount() {
        SplashScreen.hide()
    }

    onSubmit(e){
        e.preventDefault()
        const { snackbar, navigation } = this.props
        axios.post(`${SERVER_ADRESS}/register`, { pseudo: this.state.pseudo })
            .then(res => {
                if(res.data.status !== undefined){
                    snackbar.showMessage(res.data.message)
                } else {
                    navigation.navigate('chat', {
                        id : res.data._id,
                        pseudo: this.state.pseudo
                    })
                }
            })
            .catch(error => {
                snackbar.showMessage('Problème de connection au serveur')
            })
    }
    render() {
        return (
            <Container>
                <Header title="Welcome" help helpAction={this._showModal}/>
                <ImageBackground
                    styleName="large"
                    source={luminy2}
                >
                    <Tile>
                        <Overlay styleName="image-overlay">
                            <Title styleName="sm-gutter-horizontal">Bienvenue sur LumEnnui</Title>
                            <Subtitle>Saisis ou crée ton pseudo et commence à tchatter avec tout le monde</Subtitle>
                        </Overlay>
                    </Tile>
                </ImageBackground>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{ flex: 1 }}
                >
                    <ImageBackground
                        styleName="large"
                        source={luminy}
                        style={{ flex: 1 }}
                    >
                        <TextInput
                            placeholder={'Pseudo'}
                            onChangeText={(text) => this.setState({pseudo: text})}
                        />
                        <Button
                            styleName="secondary"
                            style={{ marginTop: 20}}
                            onPress={this.onSubmit}
                        >
                            <Text>ACCEDER</Text>
                        </Button>
                    </ImageBackground>
                </KeyboardAvoidingView>
                {/*Modal section*/}
                <Provider>
                    <Portal>
                        <Modal visible={this.state.visible} onDismiss={this._hideModal}>
                            <Card style={{ width: 200, height: 400}}>
                                <Image
                                    styleName="medium-avatar"
                                    source={moi}
                                />
                                <View styleName="content">
                                    <ScrollView>
                                        <Subtitle>
                                            Cette application a pour but de passer le temps quand on
                                            s'ennuie, de pouvoir parler de tout et n'importe quoi, pouvoir se libérer car
                                            tout est anonyme.
                                        </Subtitle>
                                        {/*<Subtitle style={{ color: 'red'}}>
                                            À noter également que les
                                            discussions sont effacées des serveurs tous les jours à minuit
                                        </Subtitle>*/}
                                        <Caption>Créé par Mama DEMBELE aka Pakendux</Caption>
                                    </ScrollView>
                                </View>
                            </Card>
                        </Modal>
                    </Portal>
                </Provider>
            </Container>
        );
    }
}
export default withSnackbar(Welcome)
