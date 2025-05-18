import { StyleSheet } from 'react-native';

const stylesPerfil = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40E0D0',
    alignItems: 'center',
    padding: 20,
  },
  photoContainer: {
    width: 160,
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  infoBlock: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '90%',
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff', 
    marginBottom: 5,
  },
  infoText: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
  },
});

export default stylesPerfil;
