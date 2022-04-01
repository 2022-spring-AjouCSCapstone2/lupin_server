import { JoinRequest } from '~/dto';
import { User } from '~/models';
import { ConflictError } from '~/utils';

export const join = async (dto: JoinRequest) => {
    const user = dto.toDocument();
    const isExist = await User.findOne({ email: user.email });
    if (isExist) {
        throw new ConflictError('Info already exists');
    }
    return user.save();
};
