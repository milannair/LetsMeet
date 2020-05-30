import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    unaMeetingRequest: { // unanimous meeting request container
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    pollMeetingRequest: { // poll meeting request container
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    button: {
        width: 100,
        marginBottom: 8,
        marginRight: 16,
    },
    buttonContainer: { // to store accept and decline button horizontally
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    fab: {
        position: 'absolute',
        marginBottom: 16,
        marginRight: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "#663399",
    },
    medText: { // white text 60% opacity for medium emphasis text
        color: 'rgba(0, 0, 0, .6)'
    }
});

export default styles;