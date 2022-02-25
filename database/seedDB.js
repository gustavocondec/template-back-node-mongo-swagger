import bcryptjs from 'bcryptjs';

import Role from '../models/role';
import User from '../models/user';

export const create_roles = async () => {

    try {

        // Contar documentos
        const count = await Role.countDocuments();

        // Verificar si existen roles
        if (count > 0) return;

        // Crear roles en caso que no existan
        await Promise.all([
            new Role({ role: 'USER_ROLE' }).save(),
            new Role({ role: 'ADMIN_ROLE' }).save(),
        ]);

        console.log(`Roles were registered in the database: "ADMIN_ROLE" and "USER_ROLE"`);

    } catch (error) {

        console.log(error);

    }

};

export const create_admin = async () => {

    // Verificar que exista un usuario administrador
    const user = await User.findOne({ email: 'admin@localhost' });

    try {

        // Si no existe usuario administrador, crearlo
        if (!user) {

            // Encriptar password
            const salt = bcryptjs.genSaltSync();
            const password = bcryptjs.hashSync('admin', salt);

            // Crear usuario administrador
            await User.create({
                name: 'admin',
                lastname: 'admin',
                email: 'admin@localhost',
                role: 'ADMIN_ROLE',
                password,
            });

            console.log('Admin User Created!')
        }

    } catch (error) {

        console.log(error);

    }

};