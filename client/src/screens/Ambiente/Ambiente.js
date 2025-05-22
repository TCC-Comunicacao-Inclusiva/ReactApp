import React from 'react';
import CardAmbiente from '../../components/CardAmbiente.js';
import Ambiente from '../../models/Ambiente.js';

export default function AmbienteScreen() {
  const ambiente = new Ambiente('banheiro', require('../../../icons/banheiro.png'));

  return <CardAmbiente ambiente={ambiente} />;
}
