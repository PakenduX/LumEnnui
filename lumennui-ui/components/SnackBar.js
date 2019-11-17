import React, { createContext, Component } from 'react'
import { Snackbar } from 'react-native-paper'

const context = createContext()

class SnackbarProvider extends Component {
    state = {
        isOpen: false,
        isError: false,
        message: null
    }

    showMessage = (message, isError = false) =>
        this.setState({ isOpen: true, message, isError })

    close = () => this.setState({ isOpen: false })

    render () {
        const { message, isOpen } = this.state
        const { children } = this.props

        return (
            <context.Provider
                value={{
                    showMessage: this.showMessage
                }}
            >
                {children}
                <Snackbar
                    visible={isOpen}
                    onDismiss={this.close}
                    duration={this.props.duration}
                    action={{
                        label: 'Ok',
                        onPress: () => {
                            console.log("pressed")
                        },
                    }}
                >
                    {message}
                </Snackbar>
            </context.Provider>
        )
    }
}

export default SnackbarProvider

export const withSnackbar = WrappedComponent => props => (
    <context.Consumer>
        {snackbar => <WrappedComponent {...props} snackbar={snackbar} />}
    </context.Consumer>
)
