import * as PlasmicLibrary from "@ScrollAgency/plasmic-library";
import { getComponentProps, type ComponentMeta, mapPropType } from "@ScrollAgency/plasmic-library";
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
} from "plasmic-supabase"

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "93rttWLzkTrq7fZVPgTkKS",
      token: "0MdJSC8Xelx7eAkHsVEVsype0Kuhvx7mxHVd3tint9cv7Lg7eODL6k9HHg9uiyeb65jM1W87irqgqSjCYE5Q",
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

// Import des composants locauximport { AuthForm } from "./components/AuthForm";
import ButtonScroll from "./components/Button";
import PasswordCheckIndicator from './components/passwordCheckIndicator/passwordCheckIndicator';
// import PlasmicSupabaseForm from "./components/PlasmicSupabaseForm";

// Enregistrement du contexte global Supabase
PLASMIC.registerGlobalContext(SupabaseUserGlobalContext, SupabaseUserGlobalContextMeta);

// Enregistrement des composants Supabase
PLASMIC.registerComponent(SupabaseProvider, SupabaseProviderMeta);
PLASMIC.registerComponent(SupabaseUppyUploader, SupabaseUppyUploaderMeta);
PLASMIC.registerComponent(SupabaseStorageGetSignedUrl, SupabaseStorageGetSignedUrlMeta);

PLASMIC.registerComponent(ButtonScroll, {
  name: 'ButtonScroll',
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
  }
});

PLASMIC.registerComponent(PasswordCheckIndicator, {
  name: 'PasswordCheckIndicator',
  props: {
    numberOfChecks: 'number',
    colorUnchecked: 'string',
    colorChecked: 'string', 
  },
});