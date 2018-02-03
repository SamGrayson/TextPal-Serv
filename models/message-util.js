const messageTypes = {
    "reminder": {
        code: 1,
        name: "reminder",
        flags: ['remind', 'tell', 'remember', 'schedule']
    },
    "note": {
        code: 2,
        name: "note",
        flags: ['note', 'notes']
    },
    "list": {
        code: 3,
        name: "list",
        flags: ['list']
    }
};

const getRequests = ['get', 'fetch', 'pull', 'check'];
const postRequests = ['post', 'new', 'create', ' make', 'compose'];
const deleteRequests = ['delete', 'remove', 'destroy', 'omit', 'eliminate'];
const updateRequests = ['revise', 'update', 'edit']

const calledSynonyms = ['named', 'called', 'titled', 'entitled', 'labeled as', 'tagged as', 'specified as']

module.exports = {
    messageTypes: messageTypes,
    calledSynonyms: calledSynonyms,
    getRequests: getRequests,
    postRequests: postRequests,
    deleteRequests: deleteRequests,
    updateRequests: updateRequests
}