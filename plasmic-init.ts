import * as PlasmicLibrary from "./plasmic-library/components"
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
      id: process.env.NEXT_PUBLIC_PLASMIC_PROJECT_ID || "",
      token: process.env.NEXT_PUBLIC_PLASMIC_PROJECT_TOKEN || "",
    },
  ],

  preview: true,
});


//Register global context
PLASMIC.registerGlobalContext(SupabaseUserGlobalContext, SupabaseUserGlobalContextMeta)

//Register components
PLASMIC.registerComponent(SupabaseProvider, SupabaseProviderMeta);
PLASMIC.registerComponent(SupabaseUppyUploader, SupabaseUppyUploaderMeta);
PLASMIC.registerComponent(SupabaseStorageGetSignedUrl, SupabaseStorageGetSignedUrlMeta);

// Components from plasmic-library
// Badges
PLASMIC.registerComponent(PlasmicLibrary.JamBadge, PlasmicLibrary.JamBadgeMeta);

// Cards
PLASMIC.registerComponent(PlasmicLibrary.CardSimple, PlasmicLibrary.CardSimpleMeta);
PLASMIC.registerComponent(PlasmicLibrary.CardComplex, PlasmicLibrary.CardComplexMeta);

// Forms
PLASMIC.registerComponent(PlasmicLibrary.Checkbox, PlasmicLibrary.CheckboxMeta);
PLASMIC.registerComponent(PlasmicLibrary.Dropdown, PlasmicLibrary.DropdownMeta);
PLASMIC.registerComponent(PlasmicLibrary.DropdownMultiSelect, PlasmicLibrary.DropdownMultiSelectMeta);
PLASMIC.registerComponent(PlasmicLibrary.TextInput, PlasmicLibrary.TextInputMeta);
PLASMIC.registerComponent(PlasmicLibrary.JamButton, PlasmicLibrary.JamButtonMeta);
//PLASMIC.registerComponent(PlasmicLibrary.ButtonApple, PlasmicLibrary.ButtonAppleMeta);
PLASMIC.registerComponent(PlasmicLibrary.JamTextInput, PlasmicLibrary.JamTextInputMeta);
PLASMIC.registerComponent(PlasmicLibrary.SitexButton, PlasmicLibrary.SitexButtonMeta);
PLASMIC.registerComponent(PlasmicLibrary.SitexForm, PlasmicLibrary.SitexFormMeta);
PLASMIC.registerComponent(PlasmicLibrary.SitexTextInput, PlasmicLibrary.SitexTextInputMeta);
PLASMIC.registerComponent(PlasmicLibrary.PasswordCheckIndicator, PlasmicLibrary.PasswordCheckIndicatorMeta);

// Others
PLASMIC.registerComponent(PlasmicLibrary.FileUploader, PlasmicLibrary.FileUploaderMeta);
PLASMIC.registerComponent(PlasmicLibrary.ProgressBar, PlasmicLibrary.ProgressBarMeta);
PLASMIC.registerComponent(PlasmicLibrary.Toast, PlasmicLibrary.ToastMeta);
PLASMIC.registerComponent(PlasmicLibrary.Toggle, PlasmicLibrary.ToggleMeta);