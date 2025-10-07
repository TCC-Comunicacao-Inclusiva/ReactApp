import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const stylesAprendizado = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#012E40', // fundo global
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fafafa', // branco para contraste
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
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    marginVertical: 12,
    width: screenWidth * 0.27,
    height: screenHeight * 0.12,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#038C8C', // borda teal
  },
  buttonImage: {
    width: 42,
    height: 42,
    marginBottom: 6,
    // tintColor: '#038c8c', // ícones na cor teal
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#012E40',
    fontWeight: '600',
  },
});

export default stylesAprendizado;
