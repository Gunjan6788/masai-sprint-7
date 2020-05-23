import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Component/Home'
import Orders from '../Component/Orders'
import EditOrder from '../Component/EditOrder'
import Bill from '../Component/Bill'

export default function () {
    return (
        <>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/orders' component={Orders} />
                <Route path='/edit/:id' component={EditOrder}/>
                <Route path='/bill/:id' component={Bill}/>
            </Switch>
        </>
    )
}