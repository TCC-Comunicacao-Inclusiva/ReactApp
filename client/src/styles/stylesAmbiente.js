import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const stylesAmbiente = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40E0D0', 
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  addMainButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginBottom: 15,
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
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '90%',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5, 
    marginVertical: 10,  
    width: screenWidth * 0.27, 
    height: screenHeight * 0.12,
  },
  buttonImage: {
    width: 45,
    height: 45,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    fontWeight: '600',
  },
});

export default stylesAmbiente;
