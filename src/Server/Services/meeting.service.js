const fs = require('fs/promises');
const uuid = require('uuid');
const uuIdv4 = uuid.v4;


const getData = async () => fs.readFile('../file.json').then(data => JSON.parse(data));
const updateData = async (data) => fs.writeFile('../file.json', JSON.stringify(data));

const addMeeting = async(businessId, startTime, duration, meeting) => {

    const id = uuIdv4();
    meeting.id = id;
    const meetings = await getData() || [];
    const startM = new Date(startTime);
    const endM = new Date(startTime).setMinutes(startM.getMinutes() + duration);
    const exists = meetings.find(m => {
        if (m.businessId === businessId) {
            const start = new Date(m.startTime);
            const end = new Date(m.startTime).setMinutes(start.getMinutes() + start.duration);

            if (start >= startM && start <= endM) {
                return true;
            }
            if (startM >= start && startM <= end) {
                return true;
            }            
        }
        return false;
    })
    if (exists) {
        throw new Error('meetings already exists during this time');
    }
    meeting.startTime = startTime;
    meeting.duration = duration;
    meeting.businessId = businessId;
    meetings.push(meeting);
    await updateData(meetings);
    return meeting;
}

const updateMeeting = async (id, meeting) => {
    const meetings = await getData();
    const _meeting = await meetings.find(m => m.id === id);
    Object.assign(_meeting, meeting);
    await updateData(meetings);
    return _meeting;
}

const getMeetingById = async (id) => {
    const meetings = await getData();
    const _meeting = await meetings.find(m => m.id === id);
    return _meeting;
}

const getAllTheMeetings = async (businessId) => {
    const meetings = await getData();
    const _meetings = await meetings.filter(m => m.businessId === businessId);
    return _meetings;
}

const deleteMeeting = async (id) => {
    const meetings = await getData();
    const index = await meetings.findIndex(m => m.id === id);
    meetings.splice(index, 1);
    await updateData(meetings);
}
module.exports = {
    addMeeting,
    deleteMeeting,
    updateMeeting,
    getMeetingById,
    getAllTheMeetings,
}






// const fs = require('fs')
// const uuid = require('uuid');
// const uuIdv4 = uuid.v4;

// const getData = async () => fs.readFile("../file.json").then((data) => JSON.parse(data.users));
// const updateData = async (data) => fs.writeFile("../file.json", JSON.stringify(data));

// const getAllTheMeetings = async (businessId) => {
//     const user = await getData();
//     const meeting = await user.forEach(m => { meeting = [...meeting, m.m.Weights.meetings] })
//     const _meeting = await meetings.filter(m => m.businessId === businessId);
//     return _meeting;
// }


// async function getMeetingById(id) {
//     const user = await getData();
//     const meeting = await user.forEach(m => { meeting = [...meeting, m.m.Weights.meetings] })
//     const _meeting = await meetings.find(m => m.id === id);
//     return _meeting;
// }





// const addMeeting = async(businessId, startTime, duration, meeting) => {

//     const id = uuIdv4();
//     meeting.id = id;
//     const meetings = await getData() || [];
//     const startM = new Date(startTime);
//     const endM = new Date(startTime).setMinutes(startM.getMinutes() + duration);
//     const exists = meetings.find(m => {
//         if (m.businessId === businessId) {
//             const start = new Date(m.startTime);
//             const end = new Date(m.startTime).setMinutes(start.getMinutes() + start.duration);

//             if (start >= startM && start <= endM) {
//                 return true;
//             }
//             if (startM >= start && startM <= end) {
//                 return true;
//             }            
//         }
//         return false;
//     })
//     if (exists) {
//         throw new Error('meetings already exists during this time');
//     }
//     meeting.startTime = startTime;
//     meeting.duration = duration;
//     meeting.businessId = businessId;
//     meetings.push(meeting);
//     await updateData(meetings);
//     return meeting;
// }



// async function updateMeeting(id, meeting) {

// }
// async function deleteMeeting(id) {

// }
// module.exports = {
//     getAllTheMeetings, getMeetingById, addMeeting, updateMeeting, deleteMeeting
// }