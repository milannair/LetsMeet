import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    fab: {
        position: 'absolute',
        marginBottom: 30,
        marginRight: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "#663399",
    },
    title: {
        fontSize: 24,
        marginTop: 20,
    },
    medText: { // white text 60% opacity for medium emphasis text
        color: 'rgba(0, 0, 0, .6)',
        margin: 20,
    },
    numVotes: {
        fontSize: 16,
    },
});

export default styles;