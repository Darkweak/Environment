import { Field } from '../Objects';

export const email: Field = {
    label: 'Email',
    placeholder: 'votre@email.com',
    name: 'email',
    type: 'email'
};

export const password: Field = {
    label: 'Mot de passe',
    placeholder: 'votremotdepasse',
    name: 'password',
    type: 'password'
};

export const username: Field = {
    label: 'Email ou nom d\'utilisateur',
    placeholder: 'votre@email.com ou johndoe',
    name: 'username'
};

export const pseudo: Field = {
    label: 'Nom d\'utilisateur',
    placeholder: 'johndoe',
    name: 'username'
};

export const response: Field = {
    label: 'Votre réponse',
    placeholder: 'Répondez à ce sujet ici',
    name: 'description',
    type: 'textarea'
};

export const name: Field = {
    label: 'Nom du sujet',
    placeholder: 'Nom du sujet',
    name: 'name',
};

export const description: Field = {
    label: 'Description du sujet',
    placeholder: 'Description du sujet',
    name: 'description',
    type: 'textarea'
};

export const image: Field = {
    label: 'Lien de l\'image',
    placeholder: 'https://liendevotreimage',
    name: 'imageUrl'
};

export const category: Field = {
    label: 'Sélection de la catégorie',
    name: 'category',
    placeholder: 'Sélection de la catégorie',
    type: 'select'
};
