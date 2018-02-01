var messageTypes = {
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

module.exports = messageTypes;