import { PLASMIC } from '../../plasmic-init';
import PasswordCheckIndicator from './passwordCheckIndicator';

PLASMIC.registerComponent(PasswordCheckIndicator, {
  name: 'CodePasswordCheckIndicator',
  thumbnailUrl: 'https://wrtucmaotoeqjhalofcv.supabase.co/storage/v1/object/public/publicLogos//CheckCircle.svg',
  section: 'Form',
  props: {
    numberOfChecksToMake: {
      type: 'number',
      displayName: 'Number of slots to display',
      description: 'The number of checks that will be made on the password (length, contains a digit...) (by default 4)',
      defaultValueHint: 4
    },
    numberOfChecksValidated: {
      type: 'number',
      displayName: 'Number of checks validated',
      description: 'The number of checks realized on the current password entry of the user',
      defaultValueHint: 0
    },
    colorUnchecked: {
      type: 'string',
      displayName: 'Color of the unchecked slots',
      defaultValueHint: '#EFEFEF'
    },
    colorChecked: {
      type: 'string',
      displayName: 'Color of the unchecked slots',
      defaultValueHint: '#800080'
    }
  },
  templates: {
    Funky: {
      props: {
        numberOfChecksToMake: 6,
        numberOfChecksValidated: 2,
        colorUnchecked: "fd3f92",
        colorChecked: "#ffff00"
      }
    }
  }
});