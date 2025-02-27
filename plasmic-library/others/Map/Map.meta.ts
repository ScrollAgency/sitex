const MapMeta = {
    section: "Jam (Scroll)",
    displayName: "Map",
    description: "Magnifique carte MapBox",
    thumbnailUrl: "https://static1.plasmic.app/insertables/dataFetcher.svg",
    type: "component",
    name: "Map",
    props: {
        mapStyle: "string",
        latitude: "number",
        longitude: "number",
        iconUrl: "imageUrl",
        searchAddress: "string",
        zoom: "number",
        businesses: {
            type: "object",
            defaultValue: [],
        },
    },
    importPath: "./components/Map",
}
export default MapMeta;