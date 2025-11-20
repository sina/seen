
export const POOL_AUDIO = {
  'breaks': [
    {
      'label': 'break01',
      'src': 'pool-sounds.mp3',
      'startTime': '0',
      'stopTime': '2.115'
    },
    {
      'label': 'break02',
      'src': 'pool-sounds.mp3',
      'startTime': '2.327',
      'stopTime': '4.472'
    },
    {
      'label': 'break03',
      'src': 'pool-sounds.mp3',
      'startTime': '4.777',
      'stopTime': '6.380'
    },
    {
      'label': 'break04',
      'src': 'pool-sounds.mp3',
      'startTime': '6.598',
      'stopTime': '8.5'
    }
  ],
  'unlocks': [
    {
      'label': 'capcom',
      'src': 'unlocks.mp3',
      'startTime': '0',
      'stopTime': '4.785'
    },
    {
      'label': 'gyruss',
      'src': 'unlocks.mp3',
      'startTime': '7.146',
      'stopTime': '18.213'
    },
    {
      'label': 'mario',
      'src': 'unlocks.mp3',
      'startTime': '21.000',
      'stopTime': '25.750'
    },
    {
      'label': 'mgs',
      'src': 'unlocks.mp3',
      'startTime': '26.123',
      'stopTime': '36.600'
    },
    {
      'label': 'twinbee',
      'src': 'unlocks.mp3',
      'startTime': '39.696',
      'stopTime': '49.971'
    },
    {
      'label': 'zelda',
      'src': 'unlocks.mp3',
      'startTime': '51.907',
      'stopTime': '54.000'
    }
  ],
  'resets': [
    {
      'label': 'reset01',
      'src': 'pool-sounds.mp3',
      'startTime': '9.037',
      'stopTime': '10.083'
    }
  ]
};

export const getAudioLabels = (audioKey) => {
  return POOL_AUDIO[audioKey].map(entry => entry.label);
};