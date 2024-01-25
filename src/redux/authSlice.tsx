import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthenticateWithApiAfterGoogleSignIn } from '../data/api';
import { ApiCallStatus } from '../types/ApiCallStatus';

interface GoogleUserInfo {
    name: string,
    email: string,
    pictureUrl: string,
}

interface AuthSliceProps {
    isAuthenticated: boolean,
    isLoggedIn: boolean,
    googleUser?: GoogleUserInfo,
    accessToken: string,
    authenticationApiCallStatus: ApiCallStatus,
}

// Define the initial state using that type
const initialState: AuthSliceProps = {
    isAuthenticated: false,
    isLoggedIn: false,
    accessToken: '',
    googleUser: undefined,
    authenticationApiCallStatus: ApiCallStatus.Idle,
}

export const authenticateWithApi = createAsyncThunk(
    '/authenticateWithApi',
    async (googleUserAccessToken: string) => {
        return await AuthenticateWithApiAfterGoogleSignIn(googleUserAccessToken);
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.accessToken = initialState.accessToken
            state.authenticationApiCallStatus = initialState.authenticationApiCallStatus
            state.isLoggedIn = initialState.isLoggedIn
            state.googleUser = initialState.googleUser
            state.isAuthenticated = initialState.isAuthenticated
        },
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload
        },
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authenticateWithApi.pending, (state) => {
            state.authenticationApiCallStatus = ApiCallStatus.Loading;
        }),
            builder.addCase(authenticateWithApi.rejected, (state) => {
                state.authenticationApiCallStatus = ApiCallStatus.Failure;
            })
        builder.addCase(authenticateWithApi.fulfilled, (state, action) => {
            state.authenticationApiCallStatus = ApiCallStatus.Success;
            state.accessToken = action.payload.accessToken;
            state.googleUser = action.payload.googleUser;
            state.isLoggedIn = true;

            console.log("ffrello api authentication successful")
            console.log(action.payload);
        })
    },
})

export const { setIsAuthenticated, setIsLoggedIn, setAccessToken, logoutUser } = authSlice.actions

export default authSlice.reducer