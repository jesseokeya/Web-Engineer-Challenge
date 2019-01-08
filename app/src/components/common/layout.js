import React, { Component } from 'react'
import $ from 'jquery';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWastes, searchWastes } from '../../actions/wasteActions';

class Layout extends Component {
    constructor() {
        super()
        this.state = {
            favourites: [],
            wastes: [],
            search: '',
            loading: true
        }
    }

    componentWillReceiveProps(nextProps) {
        let wastes = nextProps.wastes.wastes
        wastes = wastes.map(waste => {
            let body = $.parseHTML(waste.body)[0].data
            waste.body = body
            if (!body.includes('li') || !body.includes('ul')) {
                waste.body = `<ul><li>${body}</li></ul>`
            }
            return waste
        })
        this.setState({
            wastes: nextProps.wastes.wastes,
            loading: nextProps.wastes.loading
        })
    }

    componentDidMount() {
        this.props.getWastes()
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit() {
        this.setState({ loading: true }, _ => this.props.searchWastes(this.state))
    }

    loading() {
        return this.state.loading &&
            <div className="text-center">
                <div className="lds-hourglass"></div>
            </div>
    }

    displayFavourites() {
        return this.state.favourites.length > 0 &&
            <div className="jumbotron">
                <div className="container-fluid jumbotron-up">
                    <h3 className="text-head">Favourites</h3>
                </div>
            </div>
    }

    displayWastes() {
        return !this.state.loading && this.state.wastes.length > 0 && this.state.wastes.map((waste, index) => {
            return (<div className="col" key={index}>
                <div className="contain-div">
                    <i className="fa fa-star inline default" aria-hidden="true"></i>
                    <p className="lead inline">
                        <strong className="move-right">{waste.title}</strong>
                    </p>
                    <br />
                </div>
                <div className="add-margin" style={{
                    float: 'right',
                    marginTop: '-5%',
                    minWidth: '35%'
                }}>
                  <div dangerouslySetInnerHTML={{__html: waste.body}} />
                </div>
                <br />
                <br />
            </div>
            )
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="container">
                <div className="card">
                    <nav className="navbar bg-custom text-center">
                        <ul className="nav navbar-nav mx-auto">
                            <li className="nav-item">
                                <h2>
                                    <b className="text-white"> Toronto Waste Lookup </b>
                                </h2>
                            </li>
                        </ul>
                    </nav>
                    <br />
                    <div className="container-fluid">
                        <div className="text-center">
                            <div className="col-md-10 col-lg-11 col-sm-4 inline">
                                <input name="search" className="form-control form-control-lg" type="text" placeholder="Search" onChange={this.handleChange.bind(this)} />
                            </div>
                            <button className="btn btn-primary btn-lg bg-search inline" aria-pressed="true" onClick={this.handleSubmit.bind(this)}>
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                        <br /> {this.loading()} <br />
                        <div className="container-fluid">
                            {this.displayWastes()}
                        </div>
                    </div>
                    {this.displayFavourites()}
                </div>
            </div>
        )
    }
}

Layout.propTypes = {
    wastes: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    wastes: state.wastes,
    errors: state.errors
})

export default connect(mapStateToProps, { getWastes, searchWastes })(Layout)