import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const stylesAmbiente = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#012E40', // fundo alinhado com o app
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fafafa', // texto claro no fundo escuro
    textAlign: 'center',
    marginBottom: 20,
  },
  addMainButton: {
    backgroundColor: '#038C8C', // teal principal
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginBottom: 15,
    elevation: 3,
  },
  addMainButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    width: '90%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#025159',
  },
  iconPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 15,
  },
  iconPreview: {
    width: 50,
    height: 50,
    margin: 8,
    borderRadius: 10,
    backgroundColor: '#EEE',
  },
  selectedImage: {
    width: 70,
    height: 70,
    marginBottom: 10,
    borderRadius: 15,
  },
  addButton: {
    backgroundColor: '#F28705', // botão secundário laranja
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    width: '90%',
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#025159', // cards de ação em azul petróleo
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
    width: screenWidth * 0.27,
    height: screenHeight * 0.12,
    elevation: 2,
  },
  buttonImage: {
    width: 45,
    height: 45,
    marginBottom: 5,
    tintColor: '#fafafa', // garante contraste no fundo escuro
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fafafa',
    fontWeight: '600',
  },
});

export default stylesAmbiente;
