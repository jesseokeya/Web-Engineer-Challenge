import React, { Component } from 'react'
import $ from 'jquery';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWastes, searchWastes } from '../../actions/wasteActions';

/* class Layout extend component */
class Layout extends Component {
    constructor() {
        super()
        this.state = {
            favourites: [],
            wastes: [],
            search: '',
            loading: false,
            hasSearched: false,
        }
    }

    /* massages data whenever a new prop is passed in */
    componentWillReceiveProps(nextProps) {
        let wastes = nextProps.wastes.wastes.map(waste => {
            let body = $.parseHTML(waste.body)[0].data
            waste.body = body
            if (!body.includes('<li>') || !body.includes('<ul>')) {
                waste.body = `<ul><li>${body}</li></ul>`
            }
            return waste
        })
        wastes = this.ensureFavourites(wastes)
        this.setState({
            wastes,
            loading: nextProps.wastes.loading
        })
    }
    /* called whenevr page is loaded  */
    componentDidMount() {
        /* attaches an event listener to id search  */
        const search = $('#search')
        search.keypress(e => {
            if (e.which === 13) {
                $('#searchButton').click()
            }
        })
        /* this.props.getWastes() */
    }

    /* updates state search to keep track of search field(s) */
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value, hasSearched: false })
    }

    /* sends request to the server via reduc actions to get wastes based on your search field */
    handleSubmit() {
        this.setState({ loading: true, hasSearched: true }, _ => this.props.searchWastes(this.state))
    }

    /* displays loading animation */
    loading() {
        return this.state.loading &&
            <div className="text-center">
                <div className="lds-hourglass"></div>
            </div>
    }

     /* displays loading animation */
    ensureFavourites(wastes) {
        const favourites = this.state.favourites.map(favourite => favourite.title)
        wastes = wastes.map(waste => {
            waste.favourited = favourites.includes(waste.title) ? true : false
            return waste
        })
        return wastes
    }

    /* displays all favourited waste items */
    displayFavourites() {
        return this.state.favourites.length > 0 &&
            <div className="jumbotron">
                <div className="container-fluid jumbotron-up">
                    <h3 className="text-head">Favourites</h3>
                    {this.state.favourites.length > 0 && this.state.favourites.map((waste, index) => this.displayWaste(waste, index))}
                </div>
            </div>
    }

    /* makes sure the favourited items stay favouried with the green star indication */
    ensureFavouritedIntegrity() {
        const favourites = this.state.favourites.map(favourite => $(`i[name='${favourite.title}']`))
        favourites.forEach(favourite => favourite.addClass('favourite'))
    }

    /* favourite a waste item */
    favourite(e) {
        const title = e.target.id.trim()
        const className = e.target.className
        if (className.trim() === 'fa fa-star inline default') {
            const favourited = this.state.wastes.filter(waste => waste.title.trim() === title)
            const previiousFavourite = this.state.favourites
            e.target.className = `${e.target.className} favourite`
            const favourites = this.tagFavourites([...favourited, ...previiousFavourite])
            this.setState({ favourites })
        }
        if (className.trim() === `fa fa-star inline default favourite`) {
            const target = $(`i[name='${e.target.id}']`)
            target.removeClass('favourite')
            e.target.className = `fa fa-star inline default`
            let favourites = this.state.favourites
            favourites = favourites.filter(favourite => favourite.title.trim() !== title)
            this.setState({ favourites }, this.ensureFavouritedIntegrity)
        }
    }

    /* tags favourited items */
    tagFavourites(favourites) {
        return favourites.map(favourite => {
            favourite.favourited = true
            return favourite
        })
    }

    /* displays a particular waste item */
    displayWaste(waste, index) {
        const favourited = waste.favourited && waste.favourited === true ? 'favourite' : ''
        return (<div className="card-group" key={index}>
            <div className="card contain-div custom">
                <p className="lead inline">
                    <i name={waste.title} id={waste.title} onClick={this.favourite.bind(this)} className={`fa fa-star inline default ${favourited}`} aria-hidden="true"></i>
                    <strong className="move-right">{waste.title}</strong>
                </p>
                <br />
            </div>
            <div className="card add-margin custom">
                <div dangerouslySetInnerHTML={{ __html: waste.body }} />
            </div>
        </div>)
    }

    /* displays an alert message whenver search field is empty to encourage you to search */
    alert(level, { heading, message }) {
        return (
            <div className="text-center">
                <div className={`alert alert-${level} alert-dismissible fade show`} role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <strong>{heading}</strong> {message}
                </div>
            </div>
        )
    }

    /* displays all waste items */
    displayWastes() {
        return !this.state.loading &&
            this.state.wastes.length > 0 &&
            this.state.wastes.map((waste, index) => this.displayWaste(waste, index))
    }

    /* displays an alert message whenver search field is empty to encourage you to search */
    displayDangerAlert() {
        return this.state.search.length > 0 && this.state.wastes.length <= 0 && this.state.hasSearched && this.alert('danger', { 
            heading: 'Not Found!',
            message: `no waste item(s) matching ${this.state.search} 🙁`
        })
    }

    /* displays an alert message whenver search term was not found */
    displayInfoAlert() {
        return !this.state.search.length > 0 && this.state.wastes.length <= 0 
        && this.alert('info', {
        heading: 'Lookup!',
        message: 'start searching for waste items 🙂'})
    }

    render() {
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
                                <input id="search" name="search" className="form-control form-control-lg" type="text" placeholder="Search" onChange={this.handleChange.bind(this)} />
                            </div>
                            <button id="searchButton" className="btn btn-primary btn-lg bg-search inline" aria-pressed="true" onClick={this.handleSubmit.bind(this)}>
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                        <br /> {this.loading()} <br />
                        <div className="container-fluid">
                            {this.state.search && this.displayWastes()}
                            {!this.state.loading && this.displayDangerAlert()}
                            {this.displayInfoAlert()}
                        </div>
                    </div>
                    <br />
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