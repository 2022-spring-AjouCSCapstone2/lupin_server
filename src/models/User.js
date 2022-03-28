import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userType: {
        type: String,
        enum: ['student', 'professor'],
        required: true,
    },
    userId: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    classes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class',
        },
    ],
    meta: {
        phone: { type: String },
    },
});

// _id: PK (index용 ID -> mongoDB가 자동 부여)
// userType: Enum (유저 타입 (교수인지, 학생인지))
// userId: number (학번 or 교번)
// name: string (사람이름)
// email: string (이메일, 로그인시 아이디로 사용)
// password: string (로그인시 사용하는 비밀번호)
// class: array of objectid (수강하는 과목들 -> Class DB에서 _id를 바탕으로 정보를 참조해옴)
// meta: 부가적인 정보
//      phone : string (전화번호)

const User = mongoose.model('User', userSchema);
export default User;
