import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./Home.css"
import { Col, Nav, NavItem, NavLink, Row, Spinner } from 'reactstrap';
import Card from './Component/Card';
import Header from './Component/Header';

function Home() {
    const [refresh, setRefresh] = useState([]);
    const [state, setstate] = useState([]);
    const [sortMode, setSortMode] = useState(false);
    const [loading, setloading] = useState(false);
    const [fave, setFave] = useState(false);

    useEffect(() => {
        chengeFilter()
    }, [])

    const sort = () => {
        setstate([])
        setSortMode(!sortMode)
        let sortt = sortMode ? state.sort((a, b) => (a.srm > b.srm) ? 1 : ((b.srm > a.srm) ? -1 : 0))
            : state.sort((b, a) => (a.srm > b.srm) ? 1 : ((b.srm > a.srm) ? -1 : 0))
        setTimeout(() => {
            setstate(sortt)
        }, 20);
    }
    const Refresh = (count) => {
        setRefresh(count)
    }
    const listFaverit = () => {

        let data = JSON.parse(localStorage.getItem("stateFav"))?.length > 0 ? JSON.parse(localStorage.getItem("stateFav")) : state
        setFave(!fave)
        fave && chengeFilter()
        setstate(data);
    }

    const chengeFilter = (filter) => {
        setloading(false)
        let url = filter ? `https://api.punkapi.com/v2/beers?food=${filter}` :
            `https://api.punkapi.com/v2/beers`
        axios.get(url).then((response) => {
            setstate(response.data);
            setloading(true)
        }, []).catch(e => {
            setloading(false)
        })
    }

    return (
        <div className="container">
            <Header listFaveritt={() => listFaverit()}
                listSort={() => sort()}
                refresh={refresh} setRefresh={setRefresh} chengeFilter={(item) => chengeFilter(item)} />
            {loading ?
                <div className="container">
                    <Row className='justify-content-between'>
                        {state && state.map((item) =>
                            <Card data={item} refreshCart={(count) => Refresh(count)} />
                        )}
                    </Row>
                </div> :
                <Spinner
                    className=" "
                    color="primary">
                    Loading...
                </Spinner>}

        </div>
    )
}
export default Home