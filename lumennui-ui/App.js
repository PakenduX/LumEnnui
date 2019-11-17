import React from 'react';
import RootNavigation from "./navigations/RootNavigation"
import SnackbarProvider from "./components/SnackBar";

export default class App extends React.Component {

	render(){
		return (
            <SnackbarProvider>
                <RootNavigation/>
            </SnackbarProvider>
		);
	}
}
