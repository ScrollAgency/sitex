import * as PlasmicLibrary from "@ScrollAgency/plasmic-library";
import { getComponentProps, ComponentMeta, mapPropType } from "@ScrollAgency/plasmic-library";
import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { 
  SupabaseProvider, 
  SupabaseProviderMeta,
  SupabaseUserGlobalContext,
  SupabaseUserGlobalContextMeta,
  SupabaseUppyUploader,
  SupabaseUppyUploaderMeta,
  SupabaseStorageGetSignedUrl,
  SupabaseStorageGetSignedUrlMeta,
} from "plasmic-supabase";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: process.env.PLASMIC_PROJECT_ID || "",
      token: process.env.PLASMIC_PROJECT_TOKEN || "",
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: true,
});

// Fonction pour enregistrer un composant dans Plasmic
function registerComponent(componentName: string) {
  const component = PlasmicLibrary.components[componentName];
  const meta = PlasmicLibrary.componentsMeta.find((m) => m.name === componentName) as ComponentMeta;

  if (!component || !meta) {
    console.error(`Impossible d'enregistrer ${componentName}. Métadonnées ou composant manquant.`);
    return;
  }

  const props = getComponentProps(meta);
  PLASMIC.registerComponent(component, {
    name: componentName,
    props,
    section: meta.section || "Scroll components",
  });
}

// Enregistrement des composants dynamiques
Object.keys(PlasmicLibrary.components).forEach(registerComponent);

//Register global context
PLASMIC.registerGlobalContext(SupabaseUserGlobalContext, SupabaseUserGlobalContextMeta)

//Register components
PLASMIC.registerComponent(SupabaseProvider, SupabaseProviderMeta);
PLASMIC.registerComponent(SupabaseUppyUploader, SupabaseUppyUploaderMeta);
PLASMIC.registerComponent(SupabaseStorageGetSignedUrl, SupabaseStorageGetSignedUrlMeta);

// Enregistrement du contexte global Supabase
PLASMIC.registerGlobalContext(SupabaseUserGlobalContext, SupabaseUserGlobalContextMeta);

// Enregistrement des composants Supabase
PLASMIC.registerComponent(SupabaseProvider, SupabaseProviderMeta);
PLASMIC.registerComponent(SupabaseUppyUploader, SupabaseUppyUploaderMeta);
PLASMIC.registerComponent(SupabaseStorageGetSignedUrl, SupabaseStorageGetSignedUrlMeta);

// code components

import Button from "./components/Button/Button";
import PasswordCheckIndicator from './components/passwordCheckIndicator/passwordCheckIndicator';
import TextInput from './components/TextInput/TextInput';
import { TextInputProps } from './components/TextInput/TextInput';
import Form from './components/Form/Form';
import CodeComponent from './components/CodeComponent';

// General

PLASMIC.registerComponent(Button, {
  name: 'CodeButton',
  section: 'Basic elements',
  displayName: "Button (code component)",
  props: {
    label: "string",
    icon: {
      type: "choice",
      defaultValue: "none",
      options: ["start", "none", "end"],
      required: false,
    },
    destructive: "boolean",
    hierarchy: {
      type: "choice",
      options: ["primary", "secondary"],
      defaultValue: "primary",
    },
    size: {
      type: "choice",
      options: ["small", "large"],
      defaultValue: "large",
    },
    disabled: "boolean",
    onClick: {
      type: "eventHandler",
      description: "Fonction appelée lors du clic sur le bouton.",
      argTypes: [
        {
          name: "VarInput",
          type: "string",
        },
      ],
    },
    className: {
      type: 'class',
      selectors: [
        {
          selector: ':hover',
          label: 'Hovered'
        },
        {
          selector: ':active',
          label: 'Pressed'
        },
        {
          selector: ':disabled',
          label: 'Disabled'
        }
      ]
    }
  }
});

// Form 

PLASMIC.registerComponent(Form, {
  name: "CodeForm",
  section: "Form elements",
  displayName: "Form (code component)",
  props: {
    children: {
      type: 'slot'
    }
  },
  actions: [
    {
      type: "button-action",
      label: "Append new CodeTextInput",
      onClick: ({ studioOps }) => {
        studioOps.appendToSlot(
          {
            type: 'vbox',
            children: [
              {
                type: 'text',
                value: 'Label',
              },
              {
                type: 'component',
                name: 'CodeTextInput'
              }
            ],
            styles: {
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "0px"
            },
          },
          'children'
        );
      },
    },
  ],  

});

PLASMIC.registerComponent(TextInput, {
  name: 'CodeTextInput',
  section: "Form elements",
  displayName: "Text input (code component)",
  thumbnailUrl: "https://wrtucmaotoeqjhalofcv.supabase.co/storage/v1/object/public/publicLogos//blue_magnifying_glass.svg",
  props: {
    nameInErrorMessages: 'string',
    type: {
      type: 'choice',
      options: ['text', 'password', 'tel', 'email']
    },
    placeholder: 'string',
    prefixedText: 'string',
    destructive: 'boolean',
    disabled: 'boolean',
    iconUrl: 'string',
    inputClassName: {
      type: 'class',
      selectors: [
        {
          selector: ':hover',
          label: 'Hovered'
        },
        {
          selector: ':focus',
          label: 'Focused'
        }
      ]
    },
    errorTextClassName: {
      type: 'class'
    },
    initialValue: 'string',
    required: 'boolean',
    minLength: 'number',
    maxLength: 'number',
    customValidation: 'string',
    customErrorMessage: {
      type: 'string',
      hidden: (props: TextInputProps) => !props.customValidation,
    },
    onTextChange: {
      type: "eventHandler",
      description: "Fonction appelée lors du changement de saisie.",
      argTypes: [
        {
          name: "value",
          type: "string",
        },
      ],
    },
    onValidationChange: {
      type: "eventHandler",
      description: "Fonction appelée lorsque l'input est valide.",
      argTypes: [
        {
          name: "value",
          type: "string",
        },
      ],
    }
  },
  states: {
    value: {
      type: 'writable',
      variableType: 'text',
      valueProp: 'initialValue',
      onChangeProp: 'onTextChange'
    },
    isInputValid: {
      type: 'readonly',
      variableType: 'boolean',
      onChangeProp: 'onValidationChange'
    }
  }
});

PLASMIC.registerComponent(PasswordCheckIndicator, {
  name: 'CodePasswordCheckIndicator',
  section: 'Form elements',
  displayName: "Password validation indicator (code component)",
  thumbnailUrl: 'https://wrtucmaotoeqjhalofcv.supabase.co/storage/v1/object/public/publicLogos//CheckCircle.svg',
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
      type: 'color',
      displayName: 'Color of the unchecked slots',
      defaultValueHint: '#EFEFEF'
    },
    colorChecked: {
      type: 'color',
      displayName: 'Color of the unchecked slots',
      defaultValueHint: '#800080'
    }
  },
  templates: {
    Funky: {
      props: {
        numberOfChecksToMake: 6,
        numberOfChecksValidated: 2,
        colorUnchecked: "#FD3F92",
        colorChecked: "#ffff00"
      }
    }
  },
  defaultStyles: {
    width: '100%'
  }
});

// Testing things 

PLASMIC.registerComponent(CodeComponent, {
  name: 'CodeComponent',
  props: {
    children: 'slot'
  },
  actions: [
    {
      // Creates a button that, on click, will append a new
      // image element to the `children` slot of this
      // component instance.
      type: 'button-action',
      label: 'Append new element',
      onClick: ({ studioOps }) => {
        studioOps.appendToSlot(
          {
            type: 'img',
            src: '',
            styles: {
              maxWidth: '100%'
            }
          },
          'children'
        );
      }
    }
  ]
});

