import { StyleSheet } from 'react-native';

const stylesPerfil = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#012E40', // fundo escuro do app
    alignItems: 'center',
    padding: 20,
  },
  photoContainer: {
    width: 160,
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#F28705', // borda laranja de destaque
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  infoBlock: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 14,
    width: '90%',
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: '#038C8C', // barra lateral teal
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F28705', // labels em laranja para contraste
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoText: {
    fontSize: 20,
    color: '#012E40', // texto principal em azul escuro
    fontWeight: '600',
  },
});

export default stylesPerfil;
