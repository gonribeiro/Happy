import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import OrphanageForm from './pages/OrphanageForm';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />
                <Route path="/orphanages/create" component={OrphanageForm} />
                <Route path="/orphanages/show/:id" component={Orphanage} />
                <Route path="/orphanages/edit/:id" component={OrphanageForm} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;