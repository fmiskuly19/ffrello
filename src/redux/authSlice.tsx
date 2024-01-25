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
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload
        },
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
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

            //set user for profile dropdown menu

            //set jwt (access token) in httponly cookie

            //set refresh token in httponly cookie
        })
    },
})

export const { setIsAuthenticated, setIsLoggedIn } = authSlice.actions

export default authSlice.reducer