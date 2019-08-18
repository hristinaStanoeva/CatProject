import { Contains } from '../../models';
import { User } from '../entities/user';

export interface CreateUserAdapter {
    createUser: (user: User) => Promise<Contains<User>>;
}

export interface GetUserByIdAdapter {
    getUserById: (id: User['id']) => Promise<Contains<User>>;
}

export interface GetUserByEmailAdapter {
    getUserByEmail: (name: User['email']) => Promise<Contains<User>>;
}

export interface ChangeEmailAdapter {
    changeEmail: (
        newEmail: User['email'],
        user: User
    ) => Promise<Contains<User>>;
}

export interface ChangeImageUrlAdapter {
    changeImageUrl: (
        newImageUrl: User['imageUrl'],
        user: User
    ) => Promise<Contains<User> & { imageUrl: string }>;
}

export interface DeleteImageUrlAdapter {
    deleteImageUrl: (
        user: User
    ) => Promise<Contains<User> & { imageUrl: null }>;
}

export interface ChangePasswordAdapter {
    changePassword: (
        password: User['password'],
        user: User
    ) => Promise<Contains<User>>;
}
