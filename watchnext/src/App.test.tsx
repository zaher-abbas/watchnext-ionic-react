import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import{ MemoryRouter} from "react-router";
import ComingSoon from "./pages/ComingSoon";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import * as path from "node:path";

const routes = [
    {path: '/', exact: true, component: Home},
    {path: '/coming-soon', component: ComingSoon},
    {path: '/movie/:2', component: Detail},
]

test.each(routes)("navigates to $path and render correct page",({path}) => {
 render(
     <MemoryRouter initialEntries={[path]}>
         <App />
     </MemoryRouter>
 )
});
