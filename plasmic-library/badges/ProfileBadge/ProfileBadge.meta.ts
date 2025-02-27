const ProfileBadgeMeta = {
    name: "ProfileBadge",
    section: "Hero (Scroll)",
    displayName: "Profile Badge",
    description: "Un badge utilisateur avec avatar et notifications.",
    thumbnailUrl: "https://static1.plasmic.app/insertables/modal.svg",
    props: {
      name: {
        type: "string",
        defaultValue: "Scroll",
        description: "Nom de l'utilisateur affiché à côté de l'avatar.",
      },
      badgeContent: {
        type: "string",
        defaultValue: "1",
        description: "Contenu du badge (ex: nombre de notifications).",
      },
      badgeColor: {
        type: "choice",
        options: ["primary", "success", "warning", "danger"],
        defaultValue: "primary",
        description: "Couleur du badge.",
      },
      avatarUrl: {
        type: "string",
        defaultValue: "https://i.pravatar.cc/150",
        description: "URL de l'avatar de l'utilisateur.",
      },
      avatarRadius: {
        type: "choice",
        options: ["none", "sm", "md", "lg", "full"],
        defaultValue: "full",
        description: "Forme de l'avatar.",
      },
    },
    importPath: "./components/badges/ProfileBadge/ProfileBadge",
  };
  
  export default ProfileBadgeMeta;
  