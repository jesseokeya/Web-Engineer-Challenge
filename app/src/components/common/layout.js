import React, { Component } from 'react'
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
            filteredWastes: [],
            loading: true
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            wastes: nextProps.wastes.wastes,
            loading: nextProps.wastes.loading,
            filteredWastes: nextProps.wastes.wastes,
        })
    }

    componentDidMount() {
        this.props.getWastes()
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => this.handleSubmit())
    }

    handleSubmit() {
        const searchTerm = this.state.search
        const filteredWastes = this.state.wastes.filter(
            waste => waste.keywords.includes(searchTerm) || waste.category.includes(searchTerm) || waste.title.includes(searchTerm)
        )
        this.setState({ filteredWastes })
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
        return this.state.filteredWastes.length > 0 && this.state.filteredWastes.map((waste, index) => {
            // console.log(waste)
            return (<div key={index}>
                <div className="inline">
                    <span>
                        <i className="fa fa-star inline" aria-hidden="true"></i>
                        <p className="lead inline move-right"><b>{waste.title}</b></p>
                    </span>
                </div>
                {/* <div class="inline">
                    <ul>
                        <li>Cras justo odio</li>
                        <li>Dapibus ac facilisis in</li>
                        <li>Morbi leo risus</li>
                        <li>Porta ac consectetur ac</li>
                        <li>Vestibulum at eros</li>
                    </ul>
                </div> */}
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
                            <div className="row">
                                {this.displayWastes()}
                            </div>
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