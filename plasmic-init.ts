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

// Fonction pour enregistrer automatiquement les composants de plasmic library
function registerComponents(library) {
  for (const key of Object.keys(library)) {
    if (!key.includes("Meta")) {
      const component = library[key];
      const metaKey = `${key}Meta`;
      const meta = library[metaKey];
      if (meta) {
        PLASMIC.registerComponent(component, meta);
      }
    }
  }
}
registerComponents(PlasmicLibrary);

//Register global context
PLASMIC.registerGlobalContext(SupabaseUserGlobalContext, SupabaseUserGlobalContextMeta)

//Register components
PLASMIC.registerComponent(SupabaseProvider, SupabaseProviderMeta);
PLASMIC.registerComponent(SupabaseUppyUploader, SupabaseUppyUploaderMeta);
PLASMIC.registerComponent(SupabaseStorageGetSignedUrl, SupabaseStorageGetSignedUrlMeta);
