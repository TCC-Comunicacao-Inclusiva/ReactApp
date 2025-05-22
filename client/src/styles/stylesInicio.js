import { StyleSheet } from 'react-native';

const stylesInicio = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40E0D0',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start', 
    paddingTop: 50, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    width: '80%',
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default stylesInicio;
