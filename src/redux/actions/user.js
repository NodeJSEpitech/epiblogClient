
function setUser(user) {
    return {
        type: 'USER_SET',
        user: user,
    };
}

function destroyUser(user) {
    return {
        type: 'USER_DESTROY',
        user: user,
    };
}


export default {
    setUser,
    destroyUser,
};
