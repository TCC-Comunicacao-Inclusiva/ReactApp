import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const stylesAprendizado = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40E0D0',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginTop: 50, 
  },
  listContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10, 
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5, 
    marginVertical: 10, 
    width: screenWidth * 0.27, 
    height: screenHeight * 0.12,
    elevation: 3,
  },
  buttonImage: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default stylesAprendizado;
