import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import QueryProvider from './react-query/QueryProvider';
import { Provider } from "react-redux"
import { store } from '@/store/redux-store';

interface Props {
    children: ReactNode;
}

const MainProvider = ({ children }: Props) => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <QueryProvider>
                    {children}
                </QueryProvider>
            </BrowserRouter>
        </Provider>
    );
};

export default MainProvider;
