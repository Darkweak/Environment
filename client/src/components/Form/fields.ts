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
