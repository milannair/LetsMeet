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
    avatar : {
        marginTop: '50px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    edit: {
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#bfbfbf',
    },
    textinput: {
        backgroundColor: '#f3ffe7',
        borderBottomWidth: '1px',
        borderBottomColor: '#bfbfbf',
        borderTopWidth: 0,
        marginBottom: '20px'
    },
    textinputFocused: {
        backgroundColor: '#f3ffe7',
        borderBottomWidth: '0',
        marginBottom: '20px'
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
});

export default styles