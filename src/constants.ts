const qs = require('qs');

let data = qs.stringify({
  'grant_type': 'client_credentials',
  'client_id': 'profes-api',
  'client_secret': 'P@ssw0rd' 
});

export const COLORS = {
  primary: '#677800',
  primary2: '#D6521A',
  primary3: '#F69841',

  secondary: '#376534',
  secondaryDisabled: '#85B199',

  copywritingH2: '#5A5A5A',
  copywritingH3: '#888888',
}

export const Config = {
  base_Url : 'https://dev.profescipta.co.id/so-api/',
  cred : data
}