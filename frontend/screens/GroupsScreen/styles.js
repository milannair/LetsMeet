import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#f9f9f9',
    },
    fab: {
        position: 'absolute',
        marginBottom: 16,
        marginRight: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "#663399",
    },
    message: {
        marginVertical: 12,
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        width: '80%',
    },
});

export default styles