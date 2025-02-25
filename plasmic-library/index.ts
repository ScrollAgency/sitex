const componentsContext = require.context('@/components', true, /\.tsx$/);
const metaContext = require.context("./",true,/\.meta\.ts$/);

interface ComponentMeta {
  name: string;
  props: Record<string, { type: string; defaultValue: string }>;
  section?: string;
  displayName?: string;
  description?: string;
  thumbnailUrl?: string;
  importPath?: string;
}

const components: Record<string, React.ComponentType<any>> = {};
const componentsMeta: any[] = [];

// Charger et enregistrer tous les composants
componentsContext.keys().forEach((key) => {
    const component = componentsContext(key) as { default: React.ComponentType<any> };
    const componentName = key
      .replace(/^.+\//, '') // Supprime les chemins d'accès
      .replace(/\.\w+$/, ''); // Supprime l'extension
  
    components[componentName] = component.default;
  });

// Charger les métadonnées
metaContext.keys().forEach((key) => {
    const meta = metaContext(key) as { default: ComponentMeta };
    componentsMeta.push(meta.default);
});

export { components, componentsMeta };