import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchList } from '../stores/actions/aboutAction';

class About extends Component {
    componentDidMount() {
        this.props.fetchList();
    }
    render() {
        const { list } = this.props;
        return (
            <div>
                <h3>about</h3>
                <ul>
                    {
                        list.map((li, i) => <li key={i}>{li}</li>)
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ list: state.about.list });
const mapDispatchToProps = { fetchList };

export default connect(mapStateToProps, mapDispatchToProps)(About);
