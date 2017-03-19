import React, { Component } from 'react';

// import * as action from '../../../../actions/label';


export default class LabelColor extends Component {
    componentWillMount(){
        this.setState({
            colors: [{
                name: 'green',
                code: 'green'
            }, {
                name: 'yellow',
                code: 'yellow'
            }, {
                name: 'red',
                code: 'red'
            }]
        })
    }

    submitColor(color){
        console.log('submitColor -- ', color, this.props);
        this.props.getColor(color);

    }
    render(){
        return(
            <div className="labelColorPicker">
                {this.state.colors.map((color, index) => {
                    return(
                        <div className="color" key={index} onClick={ () => this.submitColor(color)}>
                            <div className="colorDemo" style={{backgroundColor: `${color.code}`}}></div>
                        </div>
                    );
                })}
            </div>
        )
    }
}

