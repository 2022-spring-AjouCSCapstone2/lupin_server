import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    classId: { type: String, required: true },
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

// _id : PK (indexing -> mongoDB 자동 할당)
// classId : string (X033-2 이런 거)
// name : string (강의명)
// openingTime : string(임시) (강의 시작하는 시간)
// closingTime : string(임시) (강의 끝나는 시간)
// teacher: ObjectId (담당교수 -> User DB에서 _id를 바탕으로 정보를 참조해옴)
// students: array of ObjectId (담당교수 -> User DB에서 _id를 바탕으로 정보를 참조해옴)

const Class = mongoose.model('Class', classSchema);
export default Class;
