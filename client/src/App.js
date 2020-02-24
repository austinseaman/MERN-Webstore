import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import Gallery from './Gallery'
import Contact from './Contact'
import Cart from './Cart'
import './style.css'

function App() {
    return (
        <div>
            <Nav />
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/gallery" component={Gallery}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/cart" component={Cart}/>
            </Switch>
        </div>
    )
}

export default App