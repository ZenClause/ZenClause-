import React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native';

class StarterScreen extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate("SignIn");
        }, 1000)
    }
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator style={styles.indicator} size={30} color="#908832"/>
            </View>
        );
    }
}

export default StarterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        color: '#908832'
    },
    indicator: {
        marginTop: 20
    }
});
