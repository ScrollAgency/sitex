#!/bin/bash
clear

source ./node_modules/@ScrollAgency/plasmic-library/dist/scripts/update-library.sh

# Exécuter le script update-library.sh et capturer la sortie
version_message=$(update | tee /dev/tty | tail -n 1)

clear

# Afficher le menu principal
echo "         Librairie Plasmic"
echo "         ----------------- "
echo "$version_message"
echo ""

# Vérifier si le dossier plasmic-library existe
PLASMIC_LIB_DIR="./plasmic-library"
# Récupérer le nom de la branche actuelle
branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

if [ ! -d "$PLASMIC_LIB_DIR" ] && [ "$branch" != "staging" ] && [ "$branch" != "production" ]; then
  echo "-------------"
fi

if [ ! -d "$PLASMIC_LIB_DIR" ]; then
    echo "💭 Le dossier $PLASMIC_LIB_DIR n'existe pas."
    echo "   Seule l'option 2 est disponible pour télécharger les composants."
    only_download=true
else
    only_download=false
fi

echo ""

# Vérifier si la branche est "staging" ou "production"
if [[ "$branch" == "staging" || "$branch" == "production" ]]; then
    echo "🚨 Attention, vous êtes actuellement sur la branche **$branch**."
    echo "   Nous vous conseillons vivement d'installer le gestionnaire de composants sur une autre branche."
    echo "   Exemple : **local-votreNom**"
fi

if [ ! -d "$PLASMIC_LIB_DIR" ] && [ "$branch" != "staging" ] && [ "$branch" != "production" ]; then
  echo "-------------"
  echo ""
fi

echo "💬 Veuillez choisir une action :"
echo ""

# Afficher les options en fonction de la disponibilité du dossier plasmic-library
if [ "$only_download" = false ]; then
    echo "1 - Comparer les composants locaux et distants"
fi
echo "2 - Télécharger le dossier des composants"
if [ "$only_download" = false ]; then
    echo "3 - Publier vos composants vers la bibliothèque"
fi
echo "4 - Paramètres"
echo "0 - Quitter"

echo ""
read -p "Entrez le numéro de l'action souhaitée : " action

# Exécuter l'action choisie
case $action in
  1)
    if [ "$only_download" = false ]; then
        ./node_modules/@ScrollAgency/plasmic-library/dist/scripts/compare_components.sh
    else
        echo "❌ Action invalide. Seule l'option 2 est disponible."
    fi
    ;;
  2)
    ./node_modules/@ScrollAgency/plasmic-library/dist/scripts/download_update.sh
    ;;
  3)
    if [ "$only_download" = false ]; then
        ./node_modules/@ScrollAgency/plasmic-library/dist/scripts/publish_components.sh
    else
        echo "❌ Action invalide. Seule l'option 2 est disponible."
    fi
    ;;
  4)
    ./node_modules/@ScrollAgency/plasmic-library/dist/scripts/parameters.sh
    ;;
  0)
    echo "👋 Abandon de l'opération. A bientôt !"
    exit 0
    ;;
  *)
    echo "❌ Action invalide. Veuillez entrer 0, 1, 2 ou 3."
    ;;
esac
