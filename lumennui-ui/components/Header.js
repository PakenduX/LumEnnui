import * as React from 'react';
import { Appbar } from 'react-native-paper';

/**
 * The header component for all screens
 * @author Mama
 * @date september 14th 2019.
 */

export default class Header extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const {
            isBackArrow,
            action,
            title,
            subtitle,
            leave,
            leaveAction,
            help,
            helpAction
        } = this.props
        return (
            <Appbar.Header style={{ backgroundColor: 'black'}}>
                {
                    isBackArrow ?
                        <Appbar.BackAction
                            onPress={action}
                        /> :
                        null
                }
                <Appbar.Content
                    title={title}
                    subtitle={subtitle}
                />
                {
                    leave ?
                        <Appbar.Action icon="input" onPress={leaveAction} /> :
                        null
                }
                {
                    help ?
                        <Appbar.Action icon="help" onPress={helpAction} /> :
                        null
                }
            </Appbar.Header>
        );
    }
}