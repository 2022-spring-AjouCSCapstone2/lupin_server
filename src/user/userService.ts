import bcrypt from 'bcrypt';
import { JoinRequest } from '~/dto';
import { BadRequestError, ConflictError, NotFoundError } from '~/utils';
import { userRepository } from '~/repositories';

export const join = async (dto: JoinRequest) => {
    const user = dto.toEntity();

    const isExist = await userRepository.countBy({ email: user.email });
    if (isExist) {
        throw new ConflictError('Info already exists');
    }

    user.password = await bcrypt.hash(user.password, 5);

    return userRepository.save(user);
};

export const getUserById = (id: number) => {
    return userRepository.findOne({ where: { id } });
};

export const getUserByUserId = (userId: number) => {
    return userRepository.findOne({ where: { userId } });
};

export const updatePassword = async (
    id: number,
    password: string,
    newPassword: string,
) => {
    const user = await userRepository.findOneBy({ id });
    if (!user) {
        throw new NotFoundError('user not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new BadRequestError('password not match');
    }
    user.password = await bcrypt.hash(newPassword, 5);

    return userRepository.save(user);
};

export const updateUser = async (id: number, phone: string) => {
    const user = await userRepository.findOneBy({ id });

    user.phone = phone;

    return userRepository.save(user);
};

export const updateImagePath = async (id: number, path: string) => {
    const user = await userRepository.findOneBy({ id });

    user.path = path;

    return userRepository.save(user);
};
