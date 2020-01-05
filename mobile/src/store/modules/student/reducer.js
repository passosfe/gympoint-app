import produce from 'immer';

const INITIAL_STATE = {
  studentId: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.studentId = action.payload.id;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.studentId = null;
        break;
      }
      default:
    }
  });
}
