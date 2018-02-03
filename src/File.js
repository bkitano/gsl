import React, {Component} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';

import fire from './fire';

class File extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            transcript: ''
        }
    }
    
    componentDidMount() {
        const refName = '/transcripts/' + this.props.name + '/transcript';
        var db = fire.database().ref(refName);
        db.on('value', snapshot => {
            const data = snapshot.val();
            this.setState({transcript: data});
        })
        
    }
    
    render() {
        
        return (
            <div>
                <Card>
                    <CardTitle actAsExpander={true} showExpandableButton={true} title={this.props.name}/>
                    <CardText expandable={true}>{this.state.transcript}</CardText>
                </Card>
            </div>            
        ); // end of return
    }
}

export default File;