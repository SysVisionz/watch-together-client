


export default (state=INITIAL_STATE, action) => {
    const {type, payload} = action;
    switch (type) {
        case 'insert':
            return payload.session ? insertSub(payload.session, state) : state;
        case 'update':
            return payload.props.session ? replaceSub(payload.prop.session, payload.value, state) : state;
        case 'exit':
            return {...INITIAL_STATE, sessionId: payload.sessionId, users: payload.users};
        case 'exit failed': 
            return {...state, error: 'Error: failed to exit session ' + this.sessionId}
       default:
            return {...state};
    }
}

