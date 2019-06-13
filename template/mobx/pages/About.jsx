import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('AboutStore')
@observer
class About extends Component {
    componentDidMount() {
        this.props.AboutStore.fetchList();
    }
    render() {
        const { list } = this.props.AboutStore;
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

export default About;
