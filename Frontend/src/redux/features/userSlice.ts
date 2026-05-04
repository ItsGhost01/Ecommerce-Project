import { createSlice} from '@reduxjs/toolkit'



export interface User {
    firstName: string;
    lastName: string;
    email: string;
}

export interface UserState {
  value: User | null;
}

const initialState: UserState = {
  value: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    login: (state, action) => {
        console.log("Redux login");
        console.log("action.payload", action.payload);
        state.value = action.payload;
        // state.value.firstName = action.payload.firstName;
        //  state.value.lastName = action.payload.lastName;
        //   state.value.email = action.payload.email;
    },
    logout: (state) => {
        state.value = null
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer