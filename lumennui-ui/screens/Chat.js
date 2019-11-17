import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView
} from 'react-native'
import {
    GiftedChat,
    Bubble
} from 'react-native-gifted-chat'
import CustomView from './CustomView'
import axios from 'axios';
import { Container } from "native-base"
import io from 'socket.io-client'
import Header from '../components/Header'
import '../constants/serverAdress'

let socket

export default class Chat extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            typingText: null,
            canal: 1,
            id: props.navigation.getParam('id'),
            pseudo: props.navigation.getParam('pseudo')
        }

        this.onSend = this.onSend.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this._handleWS = this._handleWS.bind(this)
        this.formatMessage = this.formatMessage.bind(this)
    }

    _handleWS(){
		socket = io(`${SERVER_ADRESS}`, { transports: ['websocket'], jsonp: false })
		socket.connect()
		socket.on('connect', () => {
			console.log('connected to socket server')
		})
        socket.on('broadcast', (message) => {
            if(message.user._id !== this.state.id){
                this.setState((previousState) => {
                    return {
                        messages: GiftedChat.append(previousState.messages, message),
                    };
                })
            }
        })
    };

    /**
     * On formate les messages sous le format de giftedChat
     * @param messages
     */
    formatMessage(messages){
        let data = []
        messages.map(message =>
            data.push({
                _id: message._id,
                text: message.text,
                createdAt: message.date,
                user: {
                    _id: message.userId,
                    name: message.userName,
                },
            })
        )
        return data.reverse()
    }

    componentDidMount() {
        axios.get(`${SERVER_ADRESS}/chat-get`)
            .then(res => {
                this.setState({messages: this.formatMessage(res.data)})
            })
            .catch(error => {
                console.log(error)
            })
		this._handleWS();
    }

    onSend(messages = []) {
        let msg = {
            text: messages[0].text,
            userId: this.state.id,
            userName: this.state.pseudo
        }
        axios.post(`${SERVER_ADRESS}/chat-save`, msg)
            .then(res => {
                if(res.data.status === 'success') {
                    this.setState((previousState) => {
                        return {
                            messages: GiftedChat.append(previousState.messages, messages),
                        };
                    })
                    socket.emit('message', messages[0])
                } else {
                    this.props.snackbar.showMessage('Problème d\'envoi du message')
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#f0f0f0',
                    }
                }}
            />
        );
    }

    renderCustomView(props) {
        return (
            <CustomView
                {...props}
            />
        );
    }

    renderFooter(props) {
        if (this.state.typingText) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        {this.state.typingText}
                    </Text>
                </View>
            );
        }
        return null;
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={{flex: 1}}>
                <Container>
					<Header title="Luminy guys" leave leaveAction={() => this.props.navigation.navigate('welcome')}/>
					<GiftedChat
						messages={this.state.messages}
						onSend={this.onSend}
						user={{
							_id: this.state.id,
                            name: this.state.pseudo
						}}
						renderBubble={this.renderBubble}
						renderCustomView={this.renderCustomView}
						renderFooter={this.renderFooter}
					/>
                </Container>
            </KeyboardAvoidingView>

        );
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#aaa',
    },
});
