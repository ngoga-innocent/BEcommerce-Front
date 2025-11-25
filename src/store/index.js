import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../features/products/productApi';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/authApi';
import { categoryApi } from '../features/products/categoriesApi';
import { usersApi } from '../features/auth/userApi';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware, authApi.middleware, categoryApi.middleware, usersApi.middleware),
});
