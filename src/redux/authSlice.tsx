import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthenticateWithApiAfterGoogleSignIn } from '../data/api';
import { ApiCallStatus } from '../types/ApiCallStatus';

interface GoogleUserInfo {
    name: string,
    email: string,
    pictureUrl: string,
}

interface AuthSliceProps {
    isAuthenticatedWithExternalProvider: boolean,
    isLoggedIn: boolean,
    googleUser?: GoogleUserInfo,
    accessToken: string,
    ffrelloAuthenticationApiCallStatus: ApiCallStatus,
}

// Define the initial state using that type
const initialState: AuthSliceProps = {
    isAuthenticatedWithExternalProvider: false,
    isLoggedIn: false,
    accessToken: '',
    googleUser: undefined,
    ffrelloAuthenticationApiCallStatus: ApiCallStatus.Idle,
}

export const authenticateWithFFrelloApi = createAsyncThunk(
    '/authenticateWithFFrelloApi',
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
            state.ffrelloAuthenticationApiCallStatus = initialState.ffrelloAuthenticationApiCallStatus
            state.isLoggedIn = initialState.isLoggedIn
            state.googleUser = initialState.googleUser
            state.isAuthenticatedWithExternalProvider = initialState.isAuthenticatedWithExternalProvider
        },
        setIsAuthenticatedWithExternalProvider: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticatedWithExternalProvider = action.payload
        },
        setFfrelloAuthenticationApiCallStatus: (state, action: PayloadAction<ApiCallStatus>) => {
            state.ffrelloAuthenticationApiCallStatus = action.payload
        },
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authenticateWithFFrelloApi.pending, (state) => {
            state.ffrelloAuthenticationApiCallStatus = ApiCallStatus.Loading;
        }),
            builder.addCase(authenticateWithFFrelloApi.rejected, (state) => {
                state.ffrelloAuthenticationApiCallStatus = ApiCallStatus.Failure;
            })
        builder.addCase(authenticateWithFFrelloApi.fulfilled, (state, action) => {
            state.ffrelloAuthenticationApiCallStatus = ApiCallStatus.Success;
            state.accessToken = action.payload.accessToken;
            state.googleUser = action.payload.googleUser;
            state.isLoggedIn = true;

            console.log("ffrello api authentication successful")
            console.log(action.payload);
        })
    },
})

export const { setIsAuthenticatedWithExternalProvider, setFfrelloAuthenticationApiCallStatus, setIsLoggedIn, setAccessToken, logoutUser } = authSlice.actions

export default authSlice.reducer