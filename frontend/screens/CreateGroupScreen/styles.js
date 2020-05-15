import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#f3ffe7',
    },
    navbar : {
        height: '70px',
    },
    groupDetailsContainer: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '5px',
        marginBottom: '20px',
        height: '100px'
        // height: '200px',
    },
    groupAvatarEdit: {
        height: '100px',
        paddingTop: '40px'
    },
    avatar : {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: '30px'
    },
    edit: {
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#bfbfbf',
    },
    textinput: {
        backgroundColor: '#f3ffe7',
        paddingTop: '40px',
        elevation: '-1',
    },
    textinputFocused: {
        backgroundColor: '#f3ffe7',
        paddingTop: '40px',
    },
    chip: {
        height: '30px',
        margin: '5px',
        backgroundColor: '#b3b3b3'
    },
    chipContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginBottom: '15px',
    },
    searchBar: {
        marginBottom: "5px"

    },
    buttonText: {
        fontWeight: '550'
    }, 
});

export default styles